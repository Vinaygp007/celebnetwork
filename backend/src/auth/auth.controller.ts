import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  test() {
    return { message: 'Auth controller is working!' };
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    console.log('🔥 Login attempt for:', loginDto.email);
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    console.log('🔥 Register attempt for:', registerDto.email);
    return this.authService.register(registerDto);
  }
}
