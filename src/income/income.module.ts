import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeEntity } from '../entity/income.entity';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeEntity, UserEntity]), UserModule],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
