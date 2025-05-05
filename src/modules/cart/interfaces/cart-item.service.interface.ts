import {
  AddCartItemRequestDto,
  UpdateCartItemRequestDto,
} from '../dtos/requests';
import { CartItemResponseDto } from '../dtos/responses';

export interface ICartItemService {
  /**
   * Get a cart item by ID
   * @param id - The ID of the cart item
   * @returns The cart item
   */
  getOne(id: string): Promise<CartItemResponseDto>;

  /**
   * Add an item to the cart
   * @param userId - The ID of the user
   * @param data - The data of the cart item
   * @returns The cart item
   */
  addItem(
    userId: string,
    data: AddCartItemRequestDto,
  ): Promise<CartItemResponseDto>;

  /**
   * Update the quantity of a cart item
   * @param userId - The ID of the user
   * @param itemId - The ID of the cart item
   * @param data - The data of the cart item
   * @returns The cart item
   */
  updateItemQuantity(
    userId: string,
    itemId: string,
    data: UpdateCartItemRequestDto,
  ): Promise<CartItemResponseDto>;

  /**
   * Remove an item from the cart
   * @param userId - The ID of the user
   * @param itemId - The ID of the cart item
   */
  removeItem(userId: string, itemId: string): Promise<void>;
}
