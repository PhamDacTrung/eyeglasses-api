import { Cart, CartItem } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CartResponseDto } from '../dtos/responses';
import { ICartService } from '../interfaces';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async getCart(userId: string): Promise<CartResponseDto> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      cart = this.cartRepository.create({ userId });
      await this.cartRepository.save(cart);
    }

    return plainToInstance(CartResponseDto, cart);
  }

  async clearAll(userId: string): Promise<void> {
    const cart = await this.getCart(userId);
    await this.cartItemRepository.delete({ cart: { id: cart.id } });
  }
}
