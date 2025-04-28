import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthPayload } from '@common/interfaces';
import { NotFoundException } from '@core/exceptions';
import { plainToInstance } from 'class-transformer';

import { User } from '@entities';
import { AuthTokenDto } from '@modules/auth/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailRequestDto } from '../dtos';

@Injectable()
export class DevModeService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async generateToken(input: EmailRequestDto): Promise<AuthTokenDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload: AuthPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return plainToInstance(AuthTokenDto, { accessToken: token });
  }
}
