import { EnumInjectServiceToken } from '@common/enums';
import { Product } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './services';

const Adapters = [
  {
    provide: EnumInjectServiceToken.PRODUCT_SERVICE,
    useClass: ProductService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class ProductModule {}
