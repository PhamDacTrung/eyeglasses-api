import { ApiResponseWrapper, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
} from '../dtos/requests';
import { ProductResponseDto } from '../dtos/responses';
import { IProductService } from '../interfaces';

@Controller({
  path: 'products',
  version: '1',
})
@ApiTags('Products (Admin only)')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(EnumUserRole.ADMIN)
export class ProductAdminController {
  constructor(
    @Inject(EnumInjectServiceToken.PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}

  @Post()
  @ApiResponseWrapper(ProductResponseDto, 'Create a product')
  create(@Body() data: CreateProductRequestDto): Promise<ProductResponseDto> {
    return this.productService.createOne(data);
  }

  @Put(':id')
  @ApiResponseWrapper(undefined, 'Update a product')
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductRequestDto,
  ): Promise<void> {
    return this.productService.updateOne(id, data);
  }

  @Delete(':id')
  @ApiResponseWrapper(undefined, 'Delete a product')
  delete(@Param('id') id: string): Promise<void> {
    return this.productService.deleteOne(id);
  }
}
