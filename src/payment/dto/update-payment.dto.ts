import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsOptional, IsString } from 'class-validator';
import { IsUnique } from 'src/validation/isunique';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @IsOptional()
    @IsString({message:'Register with the correct typedata'})
    date: string;
    
    @IsOptional()
    @IsString({message:'Register with the correct typedata'})
    transaction: string;
    
    @IsOptional()
    @IsString({message:'Register with the correct typedata'})
    amount: string;

    @IsOptional()
    @IsString({message:'Register with the correct typedata'})
    destination: string;
}
