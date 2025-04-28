import { AuthPayload } from '@common/interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (key: keyof AuthPayload, ctx: ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest();

    if (key) {
      return req.user[key];
    }
    return req.user;
  },
);
