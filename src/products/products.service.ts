import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Packages } from './entities/subproduct.entity';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class ProductsService {
  constructor( 
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    @InjectRepository(Packages)
    private readonly packageRepo: Repository<Packages>,
  ){}

  async createProduct(createProductDto: CreateProductDto) {
    const product = new Product({
      ...createProductDto,
      packages: []
    });

    const existProduct = await this.productsRepo.findOne({
      where: [{
        name: product.name
      }],
    })

    if (existProduct){
      throw new ConflictException('Product has already registered')
    }
    await this.productsRepo.save(product);
  }

  async findAllProduct() {
    return this.productsRepo.find();
  }

  async findProductById(id: string) {
    const product = await this.productsRepo.findOne({
      where: {id},
      relations: {packages:true}
    });

    if (!product){
      throw new NotFoundException(`Product ${product.name} not found`)
    }
    else {
      return product;
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const productProp = await this.findProductById(id);
    productProp.name = updateProductDto.name;
    await this.productsRepo.save(productProp);
  }

  async addPackagetoProduct(id:string, packageData: CreatePackageDto){
   try {
    const product = await this.findProductById(id);
    const newPackage = await this.packageRepo.save({
      ...packageData,
      product:product
    })

    return this.packageRepo.save(newPackage);
   } catch (error) {
    throw new NotFoundException(`Product not found`)
   } 
  }

  async updatePackage(id:string, packageId:number, updatePackage: Partial<Packages>) {
    const product = await this.findProductById(id);
    const packages = product.packages.find(id => id.id == packageId)

    if (!packages){
      throw new NotFoundException(`Packages ${packageId} not found`)
    }

    Object.assign(packages, updatePackage);
    return this.packageRepo.save(packages);
  }

  async removeProduct(id: string) {
    await this.productsRepo.delete(id);
  }

  async removePackage(id:number){
    await this.packageRepo.delete(id);
  }
}
