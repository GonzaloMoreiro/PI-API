import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(dto: CreateOrderDto) {
    const { userId, products } = dto;

    return await this.ordersRepository.addOrder(userId, products);
  }

  async getOrder(id: string) {
    return await this.ordersRepository.getOrder(id);
  }
}
