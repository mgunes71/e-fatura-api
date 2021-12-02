import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [SequelizeModule.forFeature([UserEntity]), ContactModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, SequelizeModule],
})
export class UserModule {}
