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
import { JwtAuthGuard } from '../authService/Guard/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Body() expenseDto: any,
    @AuthenticatedUser() user: any,
  ): Promise<any> {
    return this.expenseService.createExpense(user, expenseDto);
  }

  @Get()
  async getAllExpense(@AuthenticatedUser() user: any): Promise<any> {
    return this.expenseService.getAllExpense(user);
  }

  @Get(':id')
  async getByDateExpense(
    @AuthenticatedUser() user: any,
    @Param('id') id: any,
  ): Promise<any> {
    return this.expenseService.getByDateExpense(user.id, id);
  }

  @Put(':id')
  async updateExpense(
    @AuthenticatedUser() user: any,
    @Param('id') id: number,
    @Body() expense: any,
  ): Promise<any> {
    return this.expenseService.updateExpense(user, id, expense);
  }

  @Delete(':id')
  async deleteExpense(
    @AuthenticatedUser() user: any,
    @Param('id') id: number,
  ): Promise<any> {
    return this.expenseService.deleteExpense(user, id);
  }
}
