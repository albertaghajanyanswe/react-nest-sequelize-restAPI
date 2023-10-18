import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';

@Module({
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders],
})
export class ProductsModule {}
