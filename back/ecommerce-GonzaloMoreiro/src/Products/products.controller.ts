import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import * as productInterface from './product.interface';

@Controller('products')
export class ProductsControler {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @HttpCode(200)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }
  @HttpCode(201)
  @Post()
  createProduct(@Body() product: productInterface.Product) {
    return this.productsService.createProduct(product);
  }
  @HttpCode(200)
  @Put(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() product: productInterface.Product,
  ) {
    this.productsService.updateProductById(Number(id), product);
    return `El usuario con id ${id} ha sido actualizado con exito`;
  }
  @HttpCode(200)
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    this.productsService.deleteProductById(Number(id));
    return `El usuario con id ${id} ha sido eliminado con exito`;
  }
}
