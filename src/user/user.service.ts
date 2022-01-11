import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ContactEntity } from '../entity/contact.entity';
import { IncomeService } from '../income/income.service';
import { ExpenseService } from '../expense/expense.service';
import { WalletEntity } from '../entity/wallet.entity';
import { IncomeEntity } from '../entity/income.entity';
import { ExpenseEntity } from '../entity/expense.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { InvoiceEntity } from '../entity/invoice.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity)
    private userRepository: typeof UserEntity,
    @InjectModel(WalletEntity)
    private walletRepository: typeof WalletEntity,
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
  ) {}

  async createUser(user: any): Promise<any> {
    return await this.userRepository.create(user);
  }

  async getByIdUser(id: any): Promise<any> {
    return await this.userRepository.findOne({
      where: { id: id },
      include: [IncomeEntity, ExpenseEntity, ContactEntity, InvoiceEntity],
    });
  }

  async updateUserPass(userDto: any, passwordDto: any): Promise<any> {
    const user = await this.getUserWithPassword(userDto.userName);
    const hashedPassword = await bcrypt.hash(passwordDto.password, 10);
    // const isPasswordMatch = await bcrypt.compare(hashedPassword, user.password);
    // if (isPasswordMatch) {
    //   throw new BadRequestException('Password is not old password');
    // }
    await this.userRepository.update(
      {
        password: hashedPassword,
      },
      { where: { id: userDto.id } },
    );
    return user;
  }

  // hesabı silme olacak
  async deleteAccount(userDto: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userDto.id },
    });
    await user.destroy();
    return 'success';
  }

  // parola login hariç bir istekde gözükmesin diye
  async getUserWithPassword(username: string) {
    return this.userRepository.scope(['defaultScope', 'withPassword']).findOne({
      where: { userName: username },
    });
  }

  async getUser(username: any): Promise<any> {
    return this.userRepository.findOne({
      where: { userName: username },
      include: [ContactEntity],
    });
  }

  // kullanıcnın şuan ki aktif bakiyesi
  async getActiveBalance(user: any): Promise<any> {
    const userIncome = await this.incomeService.getAllIncome(user);
    const userExpense = await this.expenseService.getAllExpense(user);

    let incomes = 0;
    let expenses = 0;

    await userIncome.forEach((item) => {
      incomes += item.income;
    });
    await userExpense.forEach((item) => {
      expenses += item.expense;
    });
    if (!expenses && !incomes) {
      return 0;
    } else if (!expenses) {
      return incomes;
    } else if (!incomes) {
      return expenses * -1;
    }

    return incomes - expenses;
  }

  // async getMonthlyBalance(user: any): Promise<any> {
  //   const monthBalance = await this.getActiveBalance(user);
  //   const NmonBalance = monthBalance.toString();
  //
  //   return this.walletRepository.create({
  //     userId: user.id,
  //     balance: NmonBalance,
  //   });
  // }
}
