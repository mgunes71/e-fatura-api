import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExpenseEntity } from '../entity/expense.entity';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
  imports: [SequelizeModule.forFeature([ExpenseEntity])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
