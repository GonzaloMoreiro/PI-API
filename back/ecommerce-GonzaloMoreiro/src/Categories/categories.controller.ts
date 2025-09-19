import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('seeder')
  async addCategories() {
    return await this.categoriesService.addCategories();
  }

  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }
}
