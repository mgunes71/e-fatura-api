import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvoiceEntity } from '../entity/invoice.entity';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { IncomeEntity } from '../entity/income.entity';
import { IncomeModule } from '../income/income.module';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from '../customer/customer.service';

@Module({
  imports: [
    SequelizeModule.forFeature([InvoiceEntity, IncomeEntity, CustomerEntity]),
    IncomeModule,
    // CustomerModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, CustomerService],
})
export class InvoiceModule {}
