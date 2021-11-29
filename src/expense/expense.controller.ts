import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthenticatedUser } from '../authService/decorators/authenticatedUser';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../authService/Guard/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Body() expense: any,
    @AuthenticatedUser() user: any,
  ): Promise<any> {
    return this.expenseService.createExpense(user, expense);
  }

  @Get()
  async getAllExpense(@AuthenticatedUser() user: any): Promise<any> {
    return this.expenseService.getAllExpense(user);
  }

  @Put(':id')
  async updateExpense(
    @Param('id') id: number,
    @Body() expense: any,
  ): Promise<any> {
    return this.expenseService.updateExpense(id, expense);
  }

  @Delete('id')
  async deleteExpense(@Param('id') id: number): Promise<DeleteResult> {
    return this.expenseService.deleteExpense(id);
  }
}
