import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InvoiceEntity } from '../entity/invoice.entity';
import { IncomeService } from '../income/income.service';
import { UserEntity } from '../entity/user.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(InvoiceEntity)
    private invoiceRepository: typeof InvoiceEntity,
    private incomeService: IncomeService,
    private customerService: CustomerService,
  ) {}

  async createInvoice(user: any, invoiceDto: any): Promise<any> {
    const customer = await this.customerService.getCustomerById(
      invoiceDto.customerId,
    );
    if (!customer) {
      throw new BadRequestException('Customer is not found');
    }
    const invoice = await this.invoiceRepository.create({
      description: invoiceDto.description,
      income: invoiceDto.income,
      invoiceNo: invoiceDto.invoiceNo,
      invoiceType: invoiceDto.invoiceType,
      userId: user.id,
      customerId: invoiceDto.customerId,
    });
    await this.incomeService.createIncome(user, invoiceDto);
    return invoice;
  }

  async getInvoices(user: any): Promise<any> {
    return this.invoiceRepository.findAll({
      where: { userId: user.id },
      include: [UserEntity, CustomerEntity],
    });
  }

  async getInvoiceById(user: any, id: any): Promise<any> {
    const invoices = await this.invoiceRepository.findOne({
      where: {
        userId: user.id,
        id: id,
      },
      include: [UserEntity, CustomerEntity],
    });
    if (!invoices) {
      throw new BadRequestException('invoice is not found');
    }
    return invoices;
  }

  async deleteInvoice(user: any, id: number): Promise<any> {
    const invoice = await this.invoiceRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (!invoice) {
      throw new BadRequestException('invoice is not found');
    }
    await invoice.destroy();
    return 'success';
  }
}
