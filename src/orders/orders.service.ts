import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>
  ) { }

  async createNewOrder(createOrderDto: CreateOrderDto) {
    const order = new Order({
      ...createOrderDto,
      fg_initials: [],
      vg_initials: []
    })

    try {
      await this.orderRepo.save(order);
      return 'Order Created!';
    } catch (error) {
      throw error;
    }
  }

  async findOrder(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: {
        fg_initials: true,
        vg_initials: true
      }
    })
    return order;
  }

  findAllOrder() {
    return `This action returns all orders`;
  }

  updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  removeOrder(id: number) {
    return `This action removes a #${id} order`;
  }
} 
