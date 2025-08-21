import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Licuadora',
      description: '220v, 1000W',
      price: 500,
      stock: true,
      imgUrl: 'ffasdasd',
    },
    {
      id: 2,
      name: 'TV',
      description: 'Full HD 4k',
      price: 300,
      stock: true,
      imgUrl: 'fasfdasasd',
    },
    {
      id: 3,
      name: 'Placard',
      description: 'Tamano 200cmx150cmx70cm',
      price: 400,
      stock: true,
      imgUrl: 'gasdasd',
    },
    {
      id: 4,
      name: 'Mochila',
      description: 'Capacidad 20 Litros',
      price: 50,
      stock: true,
      imgUrl: 'fasfasf',
    },
  ];

  async getProducts() {
    return this.products;
  }

  async getById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  async createProduct(product: Omit<Product, 'id'>) {
    const id = this.products.length + 1;
    this.products.push({ id, ...product });
    return { id, ...product };
  }

  async updateById(id: number, product: Omit<Product, 'id'>) {
    const productFind = this.products.find((products) => products.id === id);
    if (productFind) {
      productFind.description = product.description;
      productFind.imgUrl = product.imgUrl;
      productFind.name = product.name;
      productFind.price = product.price;
      productFind.stock = product.stock;
    }
    return id;
  }

  async deleteById(id: number) {
    this.products = this.products.filter((products) => products.id !== id);
    return id;
  }
}
