import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../authService/Guard/jwt.auth.guard';
import { DeleteResult } from 'typeorm';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // createUser(@Body() user: any) {
  //   return this.userService.createUser(user);
  // }

  // @Get()
  // async getAllUser(): Promise<any> {
  //   return this.userService.getAllUsers();
  // }

  // @Get(':id')
  // async getByIdUser(@Param('id') id: number): Promise<any> {
  //   return this.userService.getByIdUser(id);
  // }
  //
  // @Put(':id')
  // async updateUser(@Param('id') id: number, @Body() user: any): Promise<any> {
  //   return this.userService.updateUser(id, user);
  // }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }

  // @Post('userName')
  // findOne(@Body() userName: string): Promise<any> {
  //   return this.userService.findOne(userName);
  // }
}
