import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IncomeEntity } from '../entity/income.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(IncomeEntity)
    private incomeRepository: typeof IncomeEntity,
  ) {}

  async createIncome(user: any, incomeDto: any): Promise<any> {
    return this.incomeRepository.create({
      income: incomeDto.income,
      description: incomeDto.description,
      userId: user.id,
    });
  }

  async getAllIncome(user: any): Promise<any> {
    // burası direk değil o kullanıcıya ait faturaları getiriyor
    return this.incomeRepository.findAll({
      where: { userId: user.id },
      include: [UserEntity],
    });
  }

  async getByDateIncome(userId: any, id: any) {
    const incomes = await this.incomeRepository.findAll({
      where: {
        userId: userId,
        id: id,
        // created_at: '2021-12-01 04:31:33.818 +0300',
      },
    });
    if (!incomes || incomes.length === 0) {
      throw new BadRequestException('income is not found');
    }
    return incomes;
  }

  async updateIncome(user: any, id: number, incomeDto: any): Promise<any> {
    const userIncome = await this.incomeRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (userIncome) {
      await this.incomeRepository.update(
        {
          income: incomeDto.income,
          description: incomeDto.description,
        },
        { where: { id: id } },
      );
      return 'success';
    }
    throw new BadRequestException('income is not found');
  }

  // dogru çalısıyor ama okana sor yazım şekli income bos gelıyor
  async deleteIncome(user: any, id: number): Promise<any> {
    const income = await this.incomeRepository.destroy({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (!income) {
      throw new BadRequestException('income is not found');
    }
    return `${user.userName} 's incomeId: ${id} deleted`;
  }
}
