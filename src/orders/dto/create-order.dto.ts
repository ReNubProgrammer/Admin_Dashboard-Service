import { Gender } from "../entities/order.entity";

export class CreateOrderDto {
    date:number;
    customer_name:string;
    email: string;
    gender:Gender;
    time:number;
    productsName: string;
    fg_initial:string;
    vg_initial: string;
}
