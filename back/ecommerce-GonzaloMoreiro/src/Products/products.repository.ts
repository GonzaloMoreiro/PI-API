import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Category } from 'src/Categories/entities/category.entity';
import data from '../utils/seeder.json';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number = 1, limit: number = 5): Promise<Product[]> {
    const startIndex = (page - 1) * limit;
    const products = await this.productsRepository.find({
      relations: ['category'],
    });
    return products.slice(startIndex, startIndex + limit);
  }

  async getById(id: string): Promise<Product | null> {
    const productFind = await this.productsRepository.findOne({
      where: { id },
    });
    return productFind;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    const products = await this.productsRepository.find();

    for (const element of data) {
      const productExist = products.find(
        (products) => products.name === element.name,
      );

      const relatedCategory = categories.find(
        (category) => category.name === element.category,
      );

      if (!productExist) {
        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values({
            name: element.name,
            description: element.description,
            price: element.price,
            stock: element.stock,
            category: relatedCategory,
          })
          .execute();
      }
    }
    return 'Productos agregados';
  }

  async createProduct(data: CreateProductDto): Promise<string | null> {
    const category = await this.categoriesRepository.findOneBy({
      id: data.categoryId,
    });
    if (!category) throw new NotFoundException('Category not found');
    const newProduct = this.productsRepository.create({ ...data, category });
    await this.productsRepository.save(newProduct);
    return newProduct.id;
  }

  async updateById(id: string, updatedProduct): Promise<string | null> {
    const productFind = await this.productsRepository.findOne({
      where: { id },
    });
    if (!productFind) return null;
    this.productsRepository.merge(productFind, updatedProduct);
    await this.productsRepository.save(productFind);
    return id;
  }

  async deleteById(id: string): Promise<string | null> {
    const productFound = await this.productsRepository.findOne({
      where: { id },
    });
    if (!productFound) return null;
    await this.productsRepository.delete(id);
    return id;
  }
}
