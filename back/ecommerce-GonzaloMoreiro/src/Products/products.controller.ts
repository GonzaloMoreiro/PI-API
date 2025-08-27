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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { validateProduct } from 'src/utils/validate';
import { AuthGuard } from 'src/Auth/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() newProduct: Product) {
    if (validateProduct(newProduct)) {
      return this.productsService.createProduct(newProduct);
    } else {
      return 'Datos invalidos';
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() updateProduct: Product) {
    if (validateProduct(updateProduct)) {
      return this.productsService.updateProductById(id, updateProduct);
    } else {
      return 'Datos invalidos';
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.productsService.deleteProductById(id);
  }
}
