import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('new')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('all')
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('view/:productId')
  async findOneBy(@Param('productId') productId: string){
    return this.productsService.findOneById(productId);
  }

  @Patch('update/:productId')
  async update(@Param('productId') productId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete('drop/:productId')
  async remove(@Param('productId') producttId: string) {
    return this.productsService.removeProduct(producttId);
  }
}
