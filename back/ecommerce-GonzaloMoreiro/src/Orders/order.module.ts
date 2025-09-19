import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersService } from './order.service';
import { OrdersRepository } from './order.repository';
import { OrdersController } from './order.controller';
import { OrderDetail } from 'src/OrderDetails/entities/orderDetail.entity';
import { User } from 'src/Users/entities/user.entity';
import { Product } from 'src/Products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
