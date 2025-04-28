import { User } from 'src/infrastructure/database/typeorm/entities';
import { LoginRequestDto, RegisterRequestDto } from '../dtos/requests';
import { RegisterResponseDto } from '../dtos/responses';
import { AuthTokenDto } from '../dtos/responses/auth-token.response.dto';

export interface IAuthService {
  register(input: RegisterRequestDto): Promise<RegisterResponseDto>;
  login(input: LoginRequestDto): Promise<AuthTokenDto>;
  validateUserById(userId: string): Promise<User>;
}
