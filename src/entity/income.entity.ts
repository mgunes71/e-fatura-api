import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table
export class IncomeEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  income: number;

  @Column
  description: string;

  @ForeignKey(() => UserEntity)
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
