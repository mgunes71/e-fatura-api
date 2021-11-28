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
import { IncomeService } from './income.service';
import { JwtAuthGuard } from '../authService/Guard/jwt.auth.guard';
import { AuthenticatedUser } from '../authService/decorators/authenticatedUser';
import { DeleteResult } from 'typeorm';

@UseGuards(JwtAuthGuard)
@Controller('incomes')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @Post()
  async create(@Body() income: any, @AuthenticatedUser() user: any) {
    return this.incomeService.createIncome(user, income);
  }

  @Get()
  async getAllIncome(@AuthenticatedUser() user: any): Promise<any> {
    return this.incomeService.getAllIncome(user);
  }

  @Put(':id')
  async updateIncome(
    @Param('id') id: number,
    @Body() income: any,
  ): Promise<any> {
    return this.incomeService.updateIncome(id, income);
  }

  @Delete(':id')
  async deleteIncome(@Param('id') id: number): Promise<DeleteResult> {
    return this.incomeService.deleteIncome(id);
  }
}
