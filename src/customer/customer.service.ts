import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerEntity } from '../entity/customer.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(CustomerEntity)
    private customerRepository: typeof CustomerEntity,
  ) {}

  async createCustomer(user: any, customerDto: any): Promise<any> {
    const uniqueEmail = await this.customerRepository.findOne({
      where: { email: customerDto.email },
    });
    if (uniqueEmail) {
      throw new BadRequestException('E-mail is already exist');
    }
    return this.customerRepository.create({
      fullName: customerDto.fullName,
      email: customerDto.email,
      phone: customerDto.phone,
      vkn: customerDto.vkn,
      taxOffice: customerDto.taxOffice,
      userId: user.id,
    });
  }

  async updateCustomer(user: any, id: any, customerDto: any): Promise<any> {
    const customer = await this.customerRepository.findOne({
      where: {
        userId: user.id,
        id: id,
      },
    });
    if (!customer) {
      throw new BadRequestException('customer or it s user not found');
    }
    await this.customerRepository.update(
      {
        fullName: customerDto.fullName,
        email: customerDto.email,
        phone: customerDto.phone,
        vkn: customerDto.vkn,
        taxOffice: customerDto.taxOffice,
      },
      { where: { id: id } },
    );
    return 'success';
  }

  async getCustomersByUser(user: any): Promise<any> {
    const customers = await this.customerRepository.findAll({
      where: {
        userId: user.id,
      },
      include: [UserEntity],
    });
    if (!customers || customers.length === 0) {
      throw new BadRequestException('customers not found');
    }
    return customers;
  }

  async deleteCustomer(user: any, id: number): Promise<any> {
    const customer = await this.customerRepository.findOne({
      where: {
        userId: user.id,
        id: id,
      },
    });
    if (!customer) {
      throw new BadRequestException('customer is not found');
    }
    await customer.destroy();
    return 'success';
  }
}
