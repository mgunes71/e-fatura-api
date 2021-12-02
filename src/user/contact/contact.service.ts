import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactEntity } from '../../entity/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(ContactEntity)
    private contactRepository: typeof ContactEntity,
  ) {}

  async createContact(user: any, contactDto: any): Promise<any> {
    const uniqueEmail = await this.contactRepository.findOne({
      where: { email: contactDto.email },
    });
    if (uniqueEmail) {
      throw new BadRequestException('E-mail is active. Please Log in');
    }
    return await this.contactRepository.create({
      userId: user.id,
      phone: contactDto.phone,
      email: contactDto.email,
      vkn: contactDto.vkn,
      taxOffice: contactDto.taxOffice,
      address: contactDto.address,
    });
  }

  async updateContact(user: any, id: number, contactDto: any): Promise<any> {
    const userContact = await this.contactRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (!userContact) {
      throw new BadRequestException('User has not contact with this id');
    }
    await this.contactRepository.update(
      {
        email: contactDto.email,
        phone: contactDto.phone,
        vkn: contactDto.vkn,
        taxOffice: contactDto.taxOffice,
        address: contactDto.address,
      },
      { where: { id: id } },
    );
    return 'success';
  }
}
