import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Put, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Packages } from './entities/subproduct.entity';
import { CreatePackageDto } from './dto/create-package.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('new')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get('all')
  async findAll() {
    return this.productsService.findAllProduct();
  }

  @Get('view/:productId')
  async findOneBy(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.productsService.findProductById(productId);
  }

  @Patch('update/:productId')
  async update(@Param('productId', ParseUUIDPipe) productId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(productId, updateProductDto);
  }

  @Post('view/:productId/package')
  async addPackagetoProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() packageData: CreatePackageDto
  ){
    try {
      const newPackage = await this.productsService.addPackagetoProduct(productId, packageData);
      return newPackage;
    } catch (error) {
      if (error instanceof NotFoundException){
        throw error;
      } else {
        throw new NotFoundException(`Error creating new package for product ${productId}`)
      }
    }
  }

  @Patch('edit/:productId/:packageId')
  async updatePackage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('packageId') packageId:number,
    @Body() updatedData: Partial<Packages>
  ){
    try {
      await this.productsService.updatePackage(productId, packageId, updatedData);
      // return updatedPackage;
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      } else {
        throw new NotFoundException(`Error updating package`)
      }
    }
  }

  @Delete('drop/:productId')
  async removeProduct(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.productsService.removeProduct(productId);
  }

  @Delete('drop/:productId/:packageId')
  async removePackage(@Param('packageId') packageId: number) {
    return this.productsService.removePackage(packageId);
  }
}
