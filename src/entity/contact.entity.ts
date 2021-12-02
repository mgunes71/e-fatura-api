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
export class ContactEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  vkn: string;

  @Column
  taxOffice: string;

  @Column
  address: string;

  @ForeignKey(() => UserEntity)
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
