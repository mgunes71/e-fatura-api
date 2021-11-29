import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// baska bir kullanıcı işlem yapamasın diye
export const AuthenticatedUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: any = request.user;
    // istek atan user ı döndürüyor
    return data ? user && user[data] : user;
  },
);
