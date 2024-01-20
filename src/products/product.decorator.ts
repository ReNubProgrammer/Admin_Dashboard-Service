import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ProductReq = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const product = request.id;

    return data? product?.[data] : product;
  },
);