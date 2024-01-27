import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/new')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createNewOrder(createOrderDto);
  }

  @Get('/all')
  findAll() {
    return this.ordersService.findAllOrder();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOrder(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.removeOrder(id);
  }
}
