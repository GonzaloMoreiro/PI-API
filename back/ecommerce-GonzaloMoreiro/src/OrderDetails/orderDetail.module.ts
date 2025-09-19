import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/orderDetail.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  providers: [],
  controllers: [],
})
export class OrderDetailsModule {}
