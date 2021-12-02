import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './Guard/jwt.auth.guard';
import { AuthenticatedUser } from './decorators/authenticatedUser';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('session')
  async session(@AuthenticatedUser() user: any) {
    return user;
  }
}
