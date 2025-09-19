import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { validateProduct } from 'src/utils/validate';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { RolesGuard } from 'src/Auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/roles/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getProducts(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 1,
  ) {
    return this.productsService.getProducts(page, limit);
  }

  @Get('seeder')
  async addProducts() {
    return await this.productsService.addProducts();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProduct: Product,
  ) {
    if (validateProduct(updateProduct)) {
      return this.productsService.updateProductById(id, updateProduct);
    } else {
      return 'Datos invalidos';
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProductById(id);
  }
}
