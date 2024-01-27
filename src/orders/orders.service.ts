import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
    @InjectRepository(Product)
    private readonly prodRepo: Repository<Product>
  ) { }

  async createNewOrder(createOrderDto: CreateOrderDto) {
    const prodName = createOrderDto.productName
    const product = await this.prodRepo.findOne({
      where: {productName: prodName}
    })
    const order = new Order({
      ...createOrderDto,
      product: product,
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
        product:true,
        fg_initials: true,
        vg_initials: true
      }
    })
    return order;
  }

  async findAllOrder() {
    return this.orderRepo.find({
      relations:{
        product:true,
        fg_initials: true,
        vg_initials: true
      }
    });
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const orderProp = await this.findOrder(id);
    try {
        Object.assign(orderProp, updateOrderDto);
        await this.orderRepo.save(orderProp);
        return `Order ${orderProp.product} Updated!`;
    } catch (error) {
      throw new NotFoundException(`Order not found`)
    }
  }

  async removeOrder(id: string) {
    await this.orderRepo.delete(id);
  }
} 
