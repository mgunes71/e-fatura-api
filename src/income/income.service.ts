import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncomeEntity } from '../entity/income.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly incomeRepository: Repository<IncomeEntity>,
  ) {}

  async createIncome(user: any, incomeDto: any): Promise<any> {
    return this.incomeRepository.save({
      income: incomeDto.income,
      user: user,
    });
  }

  // async createIncome(user: any, incomeDto: any): Promise<any> {
  //   const newIncome = await this.incomeRepository.create({
  //     income: incomeDto.income,
  //     // incomeEntity de ki user
  //     user: user,
  //   });
  //   await this.incomeRepository.save(newIncome);
  //   return newIncome;
  // }

  async getAllIncome(user: any): Promise<any> {
    // burası direk değil o kullanıcıya ait faturaları getiriyor
    return this.incomeRepository.find({ where: { user: user } });
  }

  async updateIncome(user, id: number, income: any): Promise<any> {
    const userIncomes = await this.incomeRepository.find({
      where: { user: user },
    });
    userIncomes.forEach((inco) => {
      if (id === inco.id) {
        return this.incomeRepository.update(id, income);
        //naber
      }
    });
    return user;
  }

  async deleteIncome(id: number): Promise<DeleteResult> {
    return this.incomeRepository.delete(id);
  }
}
