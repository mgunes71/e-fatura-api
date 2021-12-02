import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExpenseEntity } from '../entity/expense.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(ExpenseEntity)
    private expenseRepository: typeof ExpenseEntity,
  ) {}

  async createExpense(user: any, expenseDto: any): Promise<any> {
    return this.expenseRepository.create({
      expense: expenseDto.expense,
      description: expenseDto.description,
      userId: user.id,
    });
  }

  async getAllExpense(user: any): Promise<any> {
    return this.expenseRepository.findAll({
      where: { userId: user.id },
      include: [UserEntity],
    });
  }

  async getByDateExpense(userId: any, id: any) {
    const expenses = await this.expenseRepository.findAll({
      where: {
        userId: userId,
        id: id,
      },
    });
    if (!expenses || expenses.length === 0) {
      throw new BadRequestException('income is not found');
    }
    return expenses;
  }

  async updateExpense(user: any, id: number, expenseDto: any): Promise<any> {
    const userExpense = await this.expenseRepository.findOne({
      where: {
        userId: user.id,
        id: id,
      },
    });
    if (!userExpense) {
      throw new BadRequestException('expense is not found');
    }
    await this.expenseRepository.update(
      {
        expense: expenseDto.expense,
        description: expenseDto.description,
      },
      {
        where: { id: id },
      },
    );
    return 'success';
  }

  async deleteExpense(user: any, id: number): Promise<any> {
    const expense = await this.expenseRepository.findOne({
      where: {
        userId: user.id,
        id: id,
      },
    });
    if (!expense) {
      throw new BadRequestException('expense is not found');
    }
    await expense.destroy();
    return 'success';
  }
}
