import {
  Column,
  Entity,
  Exclusion,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExpenseEntity } from './expense.entity';
import { IncomeEntity } from './income.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ select: false })
  password: string;

  @OneToMany((type) => ExpenseEntity, (expense) => expense.user)
  expense: ExpenseEntity[];

  @OneToMany((type) => IncomeEntity, (income) => income.user)
  income: IncomeEntity[];
}
