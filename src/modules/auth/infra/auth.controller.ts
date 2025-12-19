import { Controller, Post, Body, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import type { LoginDto } from '../domain/dto/login.dto';
import type { RegisterDto } from '../domain/dto/register.dto';
import type { ResetPasswordDto } from '../domain/dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')           
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Patch('reset-password')
  async resetPassword(@Body() { token, password }: ResetPasswordDto) {
    return this.authService.reset({ token, password });
  }
}