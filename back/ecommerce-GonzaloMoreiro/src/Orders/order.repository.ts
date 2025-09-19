import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderDetail } from 'src/OrderDetails/entities/orderDetail.entity';
import { Product } from 'src/Products/entities/product.entity';
import { User } from 'src/Users/entities/user.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addOrder(userId: string, products: Partial<Product>[]) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      return 'Usuario no encontrado';
    }

    const productIds = products.map((p) => p.id);

    const dbProducts = await this.productsRepository.findBy({
      id: In(productIds),
    });

    const validProducts = dbProducts.filter((p) => p.stock > 0);

    if (validProducts.length !== products.length) {
      return 'Uno o mas productos no existen o no tienen stock disponible';
    }

    let totalPrice = 0;
    const updatedProducts: Product[] = [];

    for (const product of validProducts) {
      totalPrice += Number(product.price);

      product.stock -= 1;

      updatedProducts.push(product);
    }

    await this.productsRepository.save(updatedProducts);

    const order = this.ordersRepository.create({
      date: new Date(),
      user,
    });

    const savedOrder = await this.ordersRepository.save(order);

    const orderDetail = this.orderDetailsRepository.create({
      price: Number(totalPrice.toFixed(2)),
      products: validProducts,
      order: savedOrder,
    });

    const savedOrderDetail =
      await this.orderDetailsRepository.save(orderDetail);

    savedOrder.orderDetail = savedOrderDetail;
    await this.orderDetailsRepository.save(savedOrder);

    return {
      orderId: savedOrder.id,
      orderDetail: {
        id: savedOrderDetail.id,
        price: savedOrderDetail.price,
      },
    };
  }

  async getOrder(id: string) {
    const orderSearch = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        user: true,
        orderDetail: {
          products: true,
        },
      },
    });
    if (!orderSearch) {
      return 'Order no encotrada';
    }
    return {
      id: orderSearch.id,
      date: orderSearch.date,
      user: {
        id: orderSearch.user.id,
      },
      OrderDetail: {
        id: orderSearch.orderDetail.id,
        price: orderSearch.orderDetail.price,
        products: orderSearch.orderDetail.products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          imgUrl: p.imgUrl,
        })),
      },
    };
  }
}
