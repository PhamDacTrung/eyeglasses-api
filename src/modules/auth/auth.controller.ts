import { ApiResponseWrapper } from '@common/decorators';
import { EnumInjectServiceToken } from '@common/enums';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginRequestDto, RegisterRequestDto } from './dtos/requests';
import { RegisterResponseDto } from './dtos/responses';
import { AuthTokenDto } from './dtos/responses/auth-token.response.dto';
import { IAuthService } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(EnumInjectServiceToken.AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  @Post('register')
  @ApiResponseWrapper(RegisterResponseDto, 'Register a new user')
  register(@Body() input: RegisterRequestDto): Promise<RegisterResponseDto> {
    return this.authService.register(input);
  }

  @Post('login')
  @ApiResponseWrapper(AuthTokenDto, 'Login user')
  login(@Body() input: LoginRequestDto): Promise<AuthTokenDto> {
    return this.authService.login(input);
  }
}
