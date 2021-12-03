import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IncomeEntity } from '../entity/income.entity';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../entity/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([IncomeEntity]), UserModule],
  controllers: [IncomeController],
  providers: [IncomeService],
  exports: [IncomeService],
})
export class IncomeModule {}
