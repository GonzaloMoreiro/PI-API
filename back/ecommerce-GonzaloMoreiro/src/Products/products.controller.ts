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
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { validateProduct } from 'src/utils/validate';

@Controller('products')
export class ProductsControler {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getProducts(@Query('limit') limit = 5, @Query('page') page = 1) {
    return this.productsService.getProducts(page, limit);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProduct(@Body() newProduct: Product) {
    if (validateProduct(newProduct)) {
      return this.productsService.createProduct(newProduct);
    } else {
      return 'Datos invalidos';
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() updateProduct: Product) {
    if (validateProduct(updateProduct)) {
      return this.productsService.updateProductById(id, updateProduct);
    } else {
      return 'Datos invalidos';
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.productsService.deleteProductById(id);
  }
}
