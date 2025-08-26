import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductById(id: number) {
    return this.productsRepository.getById(id);
  }

  createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return this.productsRepository.createProduct(product);
  }

  updateProductById(id: number, product: Omit<Product, 'id'>) {
    return this.productsRepository.updateById(id, product);
  }

  deleteProductById(id: number) {
    return this.productsRepository.deleteById(id);
  }
}
