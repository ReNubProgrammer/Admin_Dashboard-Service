import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Packages } from './entities/subproduct.entity';

@Injectable()
export class ProductsService {
  constructor( 
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    private readonly entityManager: EntityManager
  ){}

  async create(createProductDto: CreateProductDto) {
    const product = new Product({
      ...createProductDto,
      packages: []
    });
    await this.entityManager.save(product);
  }

  async findAll() {
    return this.productsRepo.find();
  }

  async findOneById(id: string) {
    return this.productsRepo.findOne({
      where: {id},
      relations: {packages:true}
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productProp = await this.productsRepo.findOneBy({id});
    productProp.name = updateProductDto.name;
    const packageProp = updateProductDto.packages.map(
      (createPackageDto) => new Packages(createPackageDto)
    );
    productProp.packages = packageProp;
    await this.entityManager.save(productProp);
  }

  async removePackage(id:number){

  }
  async removeProduct(id: string) {
    await this.productsRepo.delete(id);
  }
}
