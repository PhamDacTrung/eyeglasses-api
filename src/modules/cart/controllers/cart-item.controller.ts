import { ApiResponseWrapper, CurrentUser, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard } from '@common/guards';
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
  AddCartItemRequestDto,
  UpdateCartItemRequestDto,
} from '../dtos/requests';
import { CartItemResponseDto } from '../dtos/responses';
import { ICartItemService } from '../interfaces';

@Controller({
  path: 'cart/items',
  version: '1',
})
@ApiTags('Cart')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Roles(EnumUserRole.USER)
export class CartItemController {
  constructor(
    @Inject(EnumInjectServiceToken.CART_ITEM_SERVICE)
    private readonly cartItemService: ICartItemService,
  ) {}

  @Post()
  @ApiResponseWrapper(CartItemResponseDto, 'Add item to cart')
  addItem(
    @CurrentUser('id') userId: string,
    @Body() data: AddCartItemRequestDto,
  ): Promise<CartItemResponseDto> {
    return this.cartItemService.addItem(userId, data);
  }

  @Put(':id')
  @ApiResponseWrapper(undefined, 'Update item quantity')
  updateItemQuantity(
    @CurrentUser('id') userId: string,
    @Param('id') itemId: string,
    @Body() data: UpdateCartItemRequestDto,
  ): Promise<CartItemResponseDto> {
    return this.cartItemService.updateItemQuantity(userId, itemId, data);
  }

  @Delete(':id')
  @ApiResponseWrapper(undefined, 'Remove item from cart')
  removeItem(
    @CurrentUser('id') userId: string,
    @Param('id') itemId: string,
  ): Promise<void> {
    return this.cartItemService.removeItem(userId, itemId);
  }
}
