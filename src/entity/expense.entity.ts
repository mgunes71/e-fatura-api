import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table
export class ExpenseEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  expense: number;

  @Column
  description: string;

  @ForeignKey(() => UserEntity)
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
