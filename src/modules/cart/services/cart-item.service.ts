import { ExceptionHandler, NotFoundException } from '@core/exceptions';
import { Cart, CartItem, Product } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import {
  AddCartItemRequestDto,
  UpdateCartItemRequestDto,
} from '../dtos/requests';
import { CartItemResponseDto, CartResponseDto } from '../dtos/responses';
import { ICartItemService } from '../interfaces';

@Injectable()
export class CartItemService implements ICartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getOne(id: string): Promise<CartItemResponseDto> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id },
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      return plainToInstance(CartItemResponseDto, cartItem);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async addItem(
    userId: string,
    data: AddCartItemRequestDto,
  ): Promise<CartItemResponseDto> {
    const { productId, quantity } = data;

    const cart = await this._getCart(userId);

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cartItem = await this.cartItemRepository.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId,
        quantity,
        price: product.price,
      });
    }

    const result = await this.cartItemRepository.save(cartItem);
    return plainToInstance(CartItemResponseDto, result);
  }

  async updateItemQuantity(
    userId: string,
    itemId: string,
    data: UpdateCartItemRequestDto,
  ): Promise<CartItemResponseDto> {
    try {
      const { quantity } = data;

      const cart = await this._getCart(userId);

      const cartItem = await this.cartItemRepository.findOne({
        where: { id: itemId, cartId: cart.id },
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      if (quantity <= 0) {
        await this.cartItemRepository.remove(cartItem);
      } else {
        cartItem.quantity = quantity;
        await this.cartItemRepository.save(cartItem);
      }

      const result = await this.getOne(itemId);

      return plainToInstance(CartItemResponseDto, result);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async removeItem(userId: string, itemId: string): Promise<void> {
    try {
      const cart = await this._getCart(userId);

      const cartItem = await this.cartItemRepository.findOne({
        where: { id: itemId, cartId: cart.id },
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      await this.cartItemRepository.remove(cartItem);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  private async _getCart(userId: string): Promise<CartResponseDto> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { userId },
      });

      if (!cart) {
        throw new NotFoundException('Cart not found');
      }

      return plainToInstance(CartResponseDto, cart);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }
}
