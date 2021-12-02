import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // bir service içinde başka servis çağırıyorsan o servisi exports: [UserService] modulde ex: UserModule
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: any) {
    const user = await this.userService.getUserWithPassword(loginDto.username);
    if (!user) {
      throw new BadRequestException('kullanıcı bulunamadı');
    }
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Şifre hatali');
    }

    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: any) {
    const invalidUser = await this.userService.getUser(registerDto.userName);
    if (invalidUser) {
      throw new BadRequestException('İnvalid username');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    try {
      return await this.userService.createUser({
        ...registerDto,
        password: hashedPassword,
      });
    } catch (error) {
      console.log(error);
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
