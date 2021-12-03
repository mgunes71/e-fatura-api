import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';
import { ContactModule } from './contact/contact.module';
import { WalletEntity } from '../entity/wallet.entity';
import { IncomeService } from '../income/income.service';
import { IncomeEntity } from '../entity/income.entity';
import { ExpenseService } from '../expense/expense.service';
import { ExpenseEntity } from '../entity/expense.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserEntity,
      WalletEntity,
      IncomeEntity,
      ExpenseEntity,
    ]),
    ContactModule,
  ],
  controllers: [UserController],
  providers: [UserService, IncomeService, ExpenseService],
  exports: [UserService],
})
export class UserModule {}
