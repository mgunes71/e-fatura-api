import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';
import { CustomerEntity } from './customer.entity';

@Table
export class InvoiceEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @PrimaryKey
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  ETTN: string;

  @Column
  description: string;

  @Column
  income: string;

  @Column
  invoiceType: string;

  @Column
  invoiceNo: string;

  @ForeignKey(() => UserEntity)
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @ForeignKey(() => CustomerEntity)
  customerId: number;

  @BelongsTo(() => CustomerEntity)
  customer: CustomerEntity;
}
