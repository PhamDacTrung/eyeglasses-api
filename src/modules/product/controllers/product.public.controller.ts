import { ApiResponseWrapper, IsPublic } from '@common/decorators';
import { EnumInjectServiceToken } from '@common/enums';
import { PageOptionsDto } from '@common/paginations';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductFiltersDto } from '../dtos/requests';
import { PageProductResponseDto, ProductResponseDto } from '../dtos/responses';
import { IProductService } from '../interfaces';

@Controller({
  path: 'products',
  version: '1',
})
@ApiTags('Products (Public)')
@IsPublic()
export class ProductPublicController {
  constructor(
    @Inject(EnumInjectServiceToken.PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}

  @Get()
  @ApiResponseWrapper(PageProductResponseDto, 'Get all products')
  getAll(
    @Query() pageOptions: PageOptionsDto,
    @Query() filters: ProductFiltersDto,
  ): Promise<PageProductResponseDto> {
    return this.productService.getAllPublic(pageOptions, filters);
  }

  @Get(':id')
  @ApiResponseWrapper(ProductResponseDto, 'Get a product by ID')
  getOneById(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.getOneById(id);
  }
}
