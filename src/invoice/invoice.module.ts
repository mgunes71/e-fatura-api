import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvoiceEntity } from '../entity/invoice.entity';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { IncomeEntity } from '../entity/income.entity';
import { IncomeModule } from '../income/income.module';

@Module({
  imports: [
    SequelizeModule.forFeature([InvoiceEntity, IncomeEntity]),
    IncomeModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
