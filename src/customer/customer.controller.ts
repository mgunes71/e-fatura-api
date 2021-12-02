import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedUser } from '../authService/decorators/authenticatedUser';
import { JwtAuthGuard } from '../authService/Guard/jwt.auth.guard';
import { CustomerService } from './customer.service';

@UseGuards(JwtAuthGuard)
@Controller('user/customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @AuthenticatedUser() user: any,
    @Body() customerDto: any,
  ): Promise<any> {
    return this.customerService.createCustomer(user, customerDto);
  }

  @Put(':id')
  async updateCustomer(
    @AuthenticatedUser() user: any,
    @Param('id') id: number,
    @Body() customerDto: any,
  ): Promise<any> {
    return this.customerService.updateCustomer(user, id, customerDto);
  }

  @Get()
  async getCustomerByUser(@AuthenticatedUser() user: any): Promise<any> {
    return this.customerService.getCustomersByUser(user);
  }

  @Delete(':id')
  async deleteCustomer(
    @AuthenticatedUser() user: any,
    @Param('id') id: number,
  ): Promise<any> {
    return this.customerService.deleteCustomer(user, id);
  }
}
