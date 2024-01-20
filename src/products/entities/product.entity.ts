import { GlobalEntity } from "src/db/global.entity";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import { Packages } from "./subproduct.entity";

@Entity()
export class Product extends GlobalEntity<Product> {
    @Column ({unique:true})
    name:string;

    @OneToMany(() => Packages, packages => packages.packageName, {cascade: true})
    packages: Packages[]

    // @OneToMany(() => Order, orders => orders.products)
    // orders: Order[];
}
