import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductById(id: string) {
    return this.productsRepository.getById(id);
  }

  createProduct(newProduct: Product): string {
    return this.productsRepository.createProduct(newProduct);
  }

  updateProductById(id: string, updateProduct: Product) {
    return this.productsRepository.updateById(id, updateProduct);
  }

  deleteProductById(id: string) {
    return this.productsRepository.deleteById(id);
  }
}
