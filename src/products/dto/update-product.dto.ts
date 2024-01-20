import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { CreatePackageDto } from './create-package.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    name: string;
    packages:CreatePackageDto[];
}
