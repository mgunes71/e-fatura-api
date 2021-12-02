import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ContactEntity } from "../entity/contact.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity)
    private userRepository: typeof UserEntity,
  ) {}

  async createUser(user: any): Promise<any> {
    return await this.userRepository.create(user);
  }

  async getByIdUser(id: any): Promise<any> {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async updateUserPass(userDto: any, passwordDto: any): Promise<any> {
    const user = await this.getUserWithPassword(userDto.userName);
    const hashedPassword = await bcrypt.hash(passwordDto.password, 10);
    // const isPasswordMatch = await bcrypt.compare(hashedPassword, user.password);
    // if (isPasswordMatch) {
    //   throw new BadRequestException('Password is not old password');
    // }
    await this.userRepository.update(
      {
        password: hashedPassword,
      },
      { where: { id: userDto.id } },
    );
    return user;
  }

  // hesabı silme olacak
  async deleteAccount(userDto: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userDto.id },
    });
    await user.destroy();
    return 'success';
  }

  // parola login hariç bir istekde gözükmesin diye
  async getUserWithPassword(username: string) {
    return this.userRepository.scope(['defaultScope', 'withPassword']).findOne({
      where: { userName: username },
    });
  }

  async getUser(username: any) {
    return this.userRepository.findOne({
      where: { userName: username },
      include: [ContactEntity],
    });
  }
}
