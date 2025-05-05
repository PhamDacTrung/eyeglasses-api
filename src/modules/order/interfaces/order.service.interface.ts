import { EnumOrderStatus } from '@common/enums';
import { PageOptionsDto } from '@common/paginations';
import { CreateOrderRequestDto, OrderFilterDto } from '../dtos/requests';
import { OrderResponseDto, PageOrderResponseDto } from '../dtos/responses';

export interface IOrderService {
  /**
   * Create a new order
   * @param userId - The ID of the user creating the order
   * @param data - The data for creating the order
   * @returns The created order
   */
  createOrder(
    userId: string,
    data: CreateOrderRequestDto,
  ): Promise<OrderResponseDto>;

  /**
   * Find all orders
   * @param userId - The ID of the user finding the orders
   * @param pageOptionDtos - The page options for the orders
   * @param filters - The filters for the orders
   * @returns The found orders
   */
  findAll(
    userId: string,
    pageOptionDtos: PageOptionsDto,
    filters: OrderFilterDto,
  ): Promise<PageOrderResponseDto>;

  /**
   * Find one order
   * @param userId - The ID of the user finding the order
   * @param id - The ID of the order
   * @returns The found order
   */
  findOne(userId: string, id: string): Promise<OrderResponseDto>;

  /**
   * Update the status of an order
   * @param userId - The ID of the user updating the order
   * @param id - The ID of the order
   * @param status - The new status for the order
   * @returns The updated order
   */
  updateStatus(id: string, status: EnumOrderStatus): Promise<void>;
}
