import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsControler } from './products.controller';
import { ProductsRepository } from './products.repository';

@Module({
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsControler],
})
export class ProductsModule {}
