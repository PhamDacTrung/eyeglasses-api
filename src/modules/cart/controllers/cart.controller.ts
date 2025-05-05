import { ApiResponseWrapper, CurrentUser, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard } from '@common/guards';
import { Controller, Delete, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartResponseDto } from '../dtos/responses';
import { ICartService } from '../interfaces';

@Controller('cart')
@ApiTags('Cart')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Roles(EnumUserRole.USER)
export class CartController {
  constructor(
    @Inject(EnumInjectServiceToken.CART_SERVICE)
    private readonly cartService: ICartService,
  ) {}

  @Get()
  @ApiResponseWrapper(CartResponseDto, 'Get cart')
  getCart(@CurrentUser('id') userId: string): Promise<CartResponseDto> {
    return this.cartService.getCart(userId);
  }

  @Delete()
  @ApiResponseWrapper(undefined, 'Clear cart')
  clearCart(@CurrentUser('id') userId: string): Promise<void> {
    return this.cartService.clearAll(userId);
  }
}
