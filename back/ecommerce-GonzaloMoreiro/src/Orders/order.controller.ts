import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { OrdersService } from './order.service';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() newOrder: CreateOrderDto) {
    return await this.ordersService.addOrder(newOrder);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.getOrder(id);
  }
}
