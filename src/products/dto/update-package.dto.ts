import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageDto } from './create-package.dto';
import { IsOptional } from 'class-validator';

export class UpdatePackageDto extends PartialType(CreatePackageDto) {
    @IsOptional()
    name?: string;

    @IsOptional()
    price?: number;
}
