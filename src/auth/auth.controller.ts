import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dtos/register-request.dto';
import { LoginRequest } from './dtos/login-request.dto';
import { LoginResponse } from './dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() req: RegisterRequest) {
    await this.authService.register(req);
  }
  @Post('login')
  async login(@Body() req: LoginRequest):Promise<LoginResponse> {
    return await this.authService.login(req);
  }
}
