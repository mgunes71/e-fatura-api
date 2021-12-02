import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactEntity } from '../../entity/contact.entity';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [SequelizeModule.forFeature([ContactEntity])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
