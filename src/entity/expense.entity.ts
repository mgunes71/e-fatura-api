import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ExpenseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // toplarken number a çevir
  expense: string;

  // @Column({ type: 'date' })
  // date_only: string;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne((type) => UserEntity, (user) => user.expense)
  user: UserEntity;
}
