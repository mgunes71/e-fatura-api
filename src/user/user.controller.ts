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
import { AuthenticatedUser } from '../authService/decorators/authenticatedUser';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Put()
  async updateUserPassword(
    @AuthenticatedUser() user: any,
    @Body() password: any,
  ): Promise<any> {
    return this.userService.updateUserPass(user, password);
  }

  @Delete()
  async deleteUser(@AuthenticatedUser() user: any): Promise<any> {
    console.log(user.userName);
    return this.userService.deleteAccount(user);
  }

  @Get()
  async getByIdUser(@AuthenticatedUser() user: any): Promise<any> {
    return this.userService.getUser(user.userName);
  }

  @Get('balance/active')
  async totalIncome(@AuthenticatedUser() user: any): Promise<any> {
    return this.userService.getActiveBalance(user);
  }

  @Get()
  async getUserDetail(@AuthenticatedUser() user: any): Promise<any> {
    return this.userService.getByIdUser(user.id);
  }

  @Get('balance/monthly')
  async monthlyBalance(@AuthenticatedUser() user: any): Promise<any> {
    return this.userService.getMonthlyBalance(user);
  }
}
