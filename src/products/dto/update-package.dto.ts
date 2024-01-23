import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageDto } from './create-package.dto';
import { IsOptional, IsString } from 'class-validator';
import { IsUnique } from 'src/validation/isunique';

export class UpdatePackageDto extends PartialType(CreatePackageDto) {
    @IsOptional()
    @IsString({message:'Register with the correct typedata'})
    @IsUnique({
        table: 'packages',
        column:'name'
    },{message:'Packages already exist. Try another.'})
    name?: string;

    @IsOptional()
    @IsString({message:'Register with the correct typedata'})
    price?: string;
}
