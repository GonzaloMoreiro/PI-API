import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsControler {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProduct(@Body() newProduct: Product) {
    return this.productsService.createProduct(newProduct);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() updateProduct: Product) {
    return this.productsService.updateProductById(id, updateProduct);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.productsService.deleteProductById(id);
  }
}
