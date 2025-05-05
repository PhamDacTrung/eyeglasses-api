import { Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { Controller, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IProductService } from '../interfaces';

@Controller({
  path: 'products',
  version: '1',
})
@ApiTags('Products (Admin only)')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(EnumUserRole.USER)
export class ProductController {
  constructor(
    @Inject(EnumInjectServiceToken.PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}
}
