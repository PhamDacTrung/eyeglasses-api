import { ApiResponseWrapper, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { PageOptionsDto } from '@common/paginations';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateProductRequestDto,
  ProductFiltersDto,
  UpdateProductRequestDto,
} from '../dtos/requests';
import { PageProductResponseDto, ProductResponseDto } from '../dtos/responses';
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

  @Get()
  @ApiResponseWrapper(PageProductResponseDto, 'Get all products')
  async getAllProducts(
    @Query() pageOptions: PageOptionsDto,
    @Query() filters?: ProductFiltersDto,
  ): Promise<PageProductResponseDto> {
    return this.productService.getAll(pageOptions, filters);
  }

  @Post()
  @ApiResponseWrapper(ProductResponseDto, 'Create a product')
  create(@Body() data: CreateProductRequestDto): Promise<ProductResponseDto> {
    return this.productService.createOne(data);
  }

  @Put(':id')
  @ApiResponseWrapper(ProductResponseDto, 'Update a product')
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.updateOne(id, data);
  }

  @Delete(':id')
  @ApiResponseWrapper(undefined, 'Delete a product')
  delete(@Param('id') id: string): Promise<void> {
    return this.productService.deleteOne(id);
  }
}
