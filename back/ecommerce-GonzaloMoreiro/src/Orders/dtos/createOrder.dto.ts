import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class ProductId {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  products: ProductId[];
}
