import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number): Product[] {
    return this.productsRepository.getProducts(page, limit);
  }

  getProductById(id: string): Product | undefined {
    return this.productsRepository.getById(id);
  }

  createProduct(newProduct: Product): string {
    return this.productsRepository.createProduct(newProduct);
  }

  updateProductById(id: string, updateProduct: Product): string | undefined {
    return this.productsRepository.updateById(id, updateProduct);
  }

  deleteProductById(id: string): string {
    return this.productsRepository.deleteById(id);
  }
}
