import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Product } from 'src/Products/entities/product.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product>[];
}
