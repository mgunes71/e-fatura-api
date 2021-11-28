import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class IncomeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // toplarken number a çevir
  income: string;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne((type) => UserEntity, (user) => user.income, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;
}
