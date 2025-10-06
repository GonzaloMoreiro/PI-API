import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    return await this.productsRepository.getProducts(page, limit);
  }

  async addProducts() {
    return await this.productsRepository.addProducts();
  }

  async getProductById(id: string): Promise<Product | null> {
    const productFind = await this.productsRepository.getById(id);
    if (!productFind) throw new NotFoundException('Producto no encontrado');
    return productFind;
  }

  async createProduct(newProduct: CreateProductDto): Promise<string | null> {
    const product = await this.productsRepository.createProduct(newProduct);
    if (!product) throw new NotFoundException('Problemas al guardas producto');
    return `Producto ${product} guardado con exito`;
  }

  async updateProductById(
    id: string,
    updateProduct: CreateProductDto,
  ): Promise<string | null> {
    const productUpdate = await this.productsRepository.updateById(
      id,
      updateProduct,
    );
    if (!productUpdate)
      throw new NotFoundException('Error al actualizar producto');
    return `Usuario ${productUpdate} actualizado con exito`;
  }

  async deleteProductById(id: string): Promise<string | null> {
    const product = await this.productsRepository.deleteById(id);
    if (!product) throw new NotFoundException('El producto no existe');
    return `El producto ${product} a sido eliminado con exito`;
  }
}
