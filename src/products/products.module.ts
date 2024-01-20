import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Packages } from './entities/subproduct.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Packages])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
