import { PageOptionsDto } from '@common/paginations';
import {
  CreateProductRequestDto,
  ProductFiltersDto,
  UpdateProductRequestDto,
} from '../dtos/requests';
import { PageProductResponseDto, ProductResponseDto } from '../dtos/responses';

export interface IProductService {
  /**
   * Get all products
   * @returns All products
   */
  getAll(
    pageOptions: PageOptionsDto,
    filters: ProductFiltersDto,
  ): Promise<PageProductResponseDto>;

  /**
   * Get all public products
   * @returns All public products
   */
  getAllPublic(
    pageOptions: PageOptionsDto,
    filters: ProductFiltersDto,
  ): Promise<PageProductResponseDto>;

  /**
   * Get a product by ID
   * @param id - The ID of the product
   * @returns The product
   */
  getOneById(id: string): Promise<ProductResponseDto>;

  /**
   * Create a product
   * @param product - The product to create
   * @returns The created product
   */
  createOne(data: CreateProductRequestDto): Promise<ProductResponseDto>;

  /**
   * Update a product
   * @param id - The ID of the product
   * @param product - The product to update
   * @returns The updated product
   */
  updateOne(
    id: string,
    data: UpdateProductRequestDto,
  ): Promise<ProductResponseDto>;

  /**
   * Delete a product
   * @param id - The ID of the product
   */
  deleteOne(id: string): Promise<void>;
}
