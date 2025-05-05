import { CartResponseDto } from '../dtos/responses';

export interface ICartService {
  /**
   * Get the cart for a user
   * @param userId - The ID of the user
   * @returns The cart for the user
   */
  getCart(userId: string): Promise<CartResponseDto>;

  /**
   * Clear the cart for a user
   * @param userId - The ID of the user
   */
  clearAll(userId: string): Promise<void>;
}
