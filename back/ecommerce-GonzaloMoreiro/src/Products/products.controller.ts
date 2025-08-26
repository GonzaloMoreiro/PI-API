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
    return this.productsService.getProductById(Number(id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProduct(@Body() newProduct: Product) {
    return this.productsService.createProduct(newProduct);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() updateProduct: Product) {
    this.productsService.updateProductById(Number(id), updateProduct);
    return `El usuario con id ${id} ha sido actualizado con exito`;
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    this.productsService.deleteProductById(Number(id));
    return `El usuario con id ${id} ha sido eliminado con exito`;
  }
}
