import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
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
  async addOrder(@Req() req, @Body() newOrder: CreateOrderDto) {
    const { userId, products } = newOrder;
    const tokenUserId = req.user.id;
    if (userId !== tokenUserId) {
      throw new ForbiddenException('No podés crear órdenes para otro usuario');
    }
    return await this.ordersService.addOrder(userId, products);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.getOrder(id);
  }
}
