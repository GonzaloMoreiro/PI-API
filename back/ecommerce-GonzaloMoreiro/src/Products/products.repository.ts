import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: '1',
      name: 'Licuadora',
      description: '220v, 1000W',
      price: 500,
      stock: true,
      imgUrl: 'ffasdasd',
    },
    {
      id: '2',
      name: 'TV',
      description: 'Full HD 4k',
      price: 300,
      stock: true,
      imgUrl: 'fasfdasasd',
    },
    {
      id: '3',
      name: 'Placard',
      description: 'Tamano 200cmx150cmx70cm',
      price: 400,
      stock: true,
      imgUrl: 'gasdasd',
    },
    {
      id: '4',
      name: 'Mochila',
      description: 'Capacidad 20 Litros',
      price: 50,
      stock: true,
      imgUrl: 'fasfasf',
    },
  ];

  getProducts() {
    return this.products;
  }

  getById(id: string) {
    return this.products.find((product) => product.id === id);
  }

  createProduct(newProduct: Product): string {
    const id = this.products.length + 1;
    newProduct.id = id.toString();
    this.products.push(newProduct);
    return `Producto ${newProduct.id} creado correctamente`;
  }

  updateById(id: string, updateProduct: Product): string | undefined {
    const productFind = this.products.find((products) => products.id === id);
    if (productFind) {
      productFind.description = updateProduct.description;
      productFind.imgUrl = updateProduct.imgUrl;
      productFind.name = updateProduct.name;
      productFind.price = updateProduct.price;
      productFind.stock = updateProduct.stock;
      return `Producto ${id} actualizado correctamente`;
    }
    return undefined;
  }

  deleteById(id: string) {
    this.products = this.products.filter((products) => products.id !== id);
    return `Producto ${id} eliminado correctamente`;
  }
}
