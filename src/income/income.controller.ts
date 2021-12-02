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

// jwt guard sadece böyle bir kullanıcı var mı bunu kontrol ediyor
@UseGuards(JwtAuthGuard)
@Controller('incomes')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @Post()
  async create(@Body() incomeDto: any, @AuthenticatedUser() user: any) {
    return this.incomeService.createIncome(user, incomeDto);
  }

  @Get()
  async getAllIncome(@AuthenticatedUser() user: any): Promise<any> {
    return this.incomeService.getAllIncome(user);
  }

  @Get(':id')
  async getByDateIncome(
    @AuthenticatedUser() user: any,
    @Param('id') id: any,
  ): Promise<any> {
    return this.incomeService.getByDateIncome(user.id, id);
  }

  @Put(':id')
  async updateIncome(
    @Param('id') id: number,
    @Body() income: any,
    @AuthenticatedUser() user: any,
  ): Promise<any> {
    return this.incomeService.updateIncome(user, id, income);
  }

  @Delete(':id')
  async deleteIncome(
    @AuthenticatedUser() user: any,
    @Param('id') id: number,
  ): Promise<any> {
    return this.incomeService.deleteIncome(user, id);
  }
}
