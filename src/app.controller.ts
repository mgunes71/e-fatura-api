import { Controller, Request, UseGuards, Get } from '@nestjs/common';

import { JwtAuthGuard } from './authService/Guard/jwt.auth.guard';

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getUser(@Request() req) {
    return req.user;
  }
}
