import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../../authService/Guard/jwt.auth.guard';
import { AuthenticatedUser } from '../../authService/decorators/authenticatedUser';

@UseGuards(JwtAuthGuard)
@Controller('user/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async createUserContact(
    @AuthenticatedUser() user: any,
    @Body() contactDto: any,
  ): Promise<any> {
    return this.contactService.createContact(user, contactDto);
  }

  @Put()
  async updateContactUser(
    @AuthenticatedUser() user: any,
    // @Param('id') id: number,
    @Body() contactDto: any,
  ): Promise<any> {
    return this.contactService.updateContact(user, contactDto);
  }
}
