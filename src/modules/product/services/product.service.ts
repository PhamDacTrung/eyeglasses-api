import { EnumSortDirection } from '@common/enums';
import { PageMetaDto, PageOptionsDto } from '@common/paginations';
import {
  ExceptionHandler,
  NotFoundException,
  UnprocessableEntityException,
} from '@core/exceptions';
import { Product } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Raw, Repository } from 'typeorm';
import {
  CreateProductRequestDto,
  ProductFiltersDto,
  UpdateProductRequestDto,
} from '../dtos/requests';
import { PageProductResponseDto, ProductResponseDto } from '../dtos/responses';
import { IProductService } from '../interfaces';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllPublic(
    pageOptions: PageOptionsDto,
    filters: ProductFiltersDto,
  ): Promise<PageProductResponseDto> {
    try {
      const { page, take, sort, sortDirection, skip } = pageOptions;
      const { keywords } = filters;

      const searchQuery = keywords?.trim().toLowerCase();
      const searchVector = searchQuery
        ? `${searchQuery.split(/\s+/).join(':* & ')}:*`
        : null;

      const [products, total] = await this.productRepository.findAndCount({
        where: {
          isPublic: true,
          searchVector: searchVector
            ? Raw((alias) => `${alias} @@ to_tsquery('simple',:query)`, {
                query: searchVector,
              })
            : null,
        },
        order: {
          [sort ?? 'createdAt']: sortDirection ?? EnumSortDirection.DESC,
        },
        skip,
        take,
      });

      const meta = new PageMetaDto({
        page,
        take,
        itemCount: total,
      });

      return new PageProductResponseDto(
        plainToInstance(ProductResponseDto, products),
        meta,
      );
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async getAll(
    pageOptions: PageOptionsDto,
    filters: ProductFiltersDto,
  ): Promise<PageProductResponseDto> {
    try {
      const { page, take, sort, sortDirection, skip } = pageOptions;
      const { keywords } = filters;

      const searchQuery = keywords?.trim().toLowerCase();
      const searchVector = searchQuery
        ? `${searchQuery.split(/\s+/).join(':* & ')}:*`
        : null;

      const [products, total] = await this.productRepository.findAndCount({
        where: {
          searchVector: searchVector
            ? Raw((alias) => `${alias} @@ to_tsquery('simple',:query)`, {
                query: searchVector,
              })
            : null,
        },
        order: {
          [sort ?? 'createdAt']: sortDirection ?? EnumSortDirection.DESC,
        },
        skip,
        take,
      });

      const meta = new PageMetaDto({
        page,
        take,
        itemCount: total,
      });

      return new PageProductResponseDto(
        plainToInstance(ProductResponseDto, products),
        meta,
      );
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async getOneById(id: string): Promise<ProductResponseDto> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Product not found', {
          productId: id,
        });
      }

      return plainToInstance(ProductResponseDto, product);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async createOne(data: CreateProductRequestDto): Promise<ProductResponseDto> {
    try {
      const product = this.productRepository.create(data);

      await this.productRepository.save(product);

      return plainToInstance(ProductResponseDto, product);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async updateOne(id: string, data: UpdateProductRequestDto): Promise<void> {
    try {
      const product = await this.getOneById(id);

      const result = await this.productRepository.update(
        { id: product.id },
        data,
      );

      if (result.affected === 0) {
        throw new UnprocessableEntityException('Failed to update product', {
          productId: id,
        });
      }
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      const existingProduct = await this.getOneById(id);

      const result = await this.productRepository.delete({
        id: existingProduct.id,
      });

      if (result.affected === 0) {
        throw new UnprocessableEntityException('Failed to delete product', {
          productId: id,
        });
      }
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }
}
