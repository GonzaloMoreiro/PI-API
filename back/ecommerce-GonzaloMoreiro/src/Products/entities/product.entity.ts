import { Category } from 'src/Categories/entities/category.entity';
import { OrderDetail } from 'src/OrderDetails/entities/orderDetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'varchar',
    default:
      'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png',
  })
  imgUrl: string;

  @ManyToMany(() => OrderDetail)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
