import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table
export class CustomerEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  fullName: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  vkn: string;

  @Column
  taxOffice: string;

  @ForeignKey(() => UserEntity)
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
