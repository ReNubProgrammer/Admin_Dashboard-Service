import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { CreatePackageDto } from './create-package.dto';
import { IsOptional, IsString } from 'class-validator';
import { IsUnique } from 'src/validation/isunique';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsString({message:'Register with the correct typedata'})
    @IsUnique({
        table: 'product',
        column:'name'
    },{message:'Packages already exist. Try another.'})
    name: string;

    packages:CreatePackageDto[];
}
