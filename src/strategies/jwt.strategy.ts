import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../authService/constant/secretKey';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    // header den gelen tokenın içinden userId yi alıyor boyle bır kullanıcı var mı kontrolu
    const user = await this.userService.getByIdUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
