import {
  Injectable,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

@Injectable()
export class RolesGuard {
  AdminUser = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    delete user.password;

    if (user.IsAdmin == false) {
      return false;
    }

    return true;
  });
}
