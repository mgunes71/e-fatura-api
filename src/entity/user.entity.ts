import {
  AutoIncrement,
  Column,
  DefaultScope,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Scopes,
} from 'sequelize-typescript';
import { IncomeEntity } from './income.entity';
import { ExpenseEntity } from './expense.entity';
import { ContactEntity } from './contact.entity';
import { InvoiceEntity } from './invoice.entity';

@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Scopes(() => ({
  withPassword: {
    attributes: {
      include: ['password'],
    },
  },
}))
@Table
export class UserEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  userName: string;

  @Column
  password: string;

  @HasMany(() => IncomeEntity)
  income: IncomeEntity[];

  @HasMany(() => ExpenseEntity)
  expense: ExpenseEntity[];

  @HasMany(() => ContactEntity)
  contact: ContactEntity;

  @HasMany(() => InvoiceEntity)
  invoice: InvoiceEntity[];
}
