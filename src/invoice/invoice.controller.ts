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
import { JwtAuthGuard } from '../authService/Guard/jwt.auth.guard';
import { AuthenticatedUser } from '../authService/decorators/authenticatedUser';
import { InvoiceService } from './invoice.service';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Post()
  async createInvoice(@AuthenticatedUser() user: any, @Body() invoiceDto: any) {
    return this.invoiceService.createInvoice(user, invoiceDto);
  }

  @Get()
  async getInvoices(@AuthenticatedUser() user: any): Promise<any> {
    return this.invoiceService.getInvoices(user);
  }

  @Get(':invoiceId')
  async getInvoiceById(
    @AuthenticatedUser() user: any,
    @Param('invoiceId') invoiceId: any,
  ): Promise<any> {
    return this.invoiceService.getInvoiceById(user, invoiceId);
  }

  @Delete(':id')
  async deleteInvoice(
    @AuthenticatedUser() user: any,
    @Param('id') id: number,
  ): Promise<any> {
    return this.invoiceService.deleteInvoice(user, id);
  }
}
