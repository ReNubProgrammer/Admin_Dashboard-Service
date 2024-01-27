import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    date: number;
    customer_name: string;
    email: string;
    gender: string;
    time: string;
    productName: string;
    status:string;
    fg_initial: string[];
    vg_initial: string[];
}
