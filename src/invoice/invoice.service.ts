import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InvoiceEntity } from '../entity/invoice.entity';
import { IncomeService } from '../income/income.service';
import { UserEntity } from '../entity/user.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerService } from "../customer/customer.service";

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(InvoiceEntity)
    private invoiceRepository: typeof InvoiceEntity,
    private incomeService: IncomeService,
    private customerService: CustomerService,
  ) {}

  async createInvoice(
    user: any,
    invoiceDto: any,
    customerId: any,
  ): Promise<any> {
    const customer = await this.customerService.getCustomerById(customerId);
    if (!customer) {
      throw new BadRequestException('Customer is not found');
    }
    const invoice = await this.invoiceRepository.create({
      description: invoiceDto.description,
      income: invoiceDto.income,
      invoiceNo: invoiceDto.invoiceNo,
      invoiceType: invoiceDto.invoiceType,
      userId: user.id,
      customerId: customerId,
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

  // async getUserWithCustomerIdInvoice(user: any, id: any): Promise<any> {}

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
