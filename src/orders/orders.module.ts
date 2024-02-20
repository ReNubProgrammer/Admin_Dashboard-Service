import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Team } from 'src/team/entities/team.entity';
import { Product } from 'src/products/entities/product.entity';
import { Months } from '../db/month.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order, Team, Product, Months])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
