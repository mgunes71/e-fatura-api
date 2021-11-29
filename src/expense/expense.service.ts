import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseEntity } from '../entity/expense.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
  ) {}

  async createExpense(user: any, expenseDto: any): Promise<any> {
    return this.expenseRepository.save({
      expense: expenseDto.expense,
      user: user,
    });
  }

  async getAllExpense(user: any): Promise<any> {
    return this.expenseRepository.find({ where: { user: user } });
  }

  async updateExpense(id: number, expense: any): Promise<any> {
    return this.expenseRepository.update(id, expense);
  }

  async deleteExpense(id: number): Promise<DeleteResult> {
    return this.expenseRepository.delete(id);
  }
}
