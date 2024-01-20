import { Product } from "src/products/entities/product.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Gender {
    male = "male",
    female = "female"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column("date")
    date:number;

    @Column({length: "10"})
    customer_name:string;

    @Column()
    email:string;

    @Column("enum", {enum: Gender})
    gender:Gender;

    @Column("time")
    time:number;

    @Column({name: "product_name"})
    productsName:string;

    @Column({name: "fg_initial"})
    fg_initial:string;

    @Column({name: "vg_initial"})
    vg_initial:string;

    // @ManyToOne(() => Product, products => products.orders)
    // @JoinColumn({name:"product_name",referencedColumnName: 'name'})
    // products: Product;

    @ManyToOne(() => Team, fg => fg.fgorders)
    @JoinColumn({name:"fg_initial",referencedColumnName: 'initial'})
    fg: Team;

    @ManyToOne(() => Team, fg => fg.fgorders)
    @JoinColumn({name:"vg_initial",referencedColumnName: 'initial'})
    vg: Team;

    constructor(item:Partial<Order>){
        Object.assign(this, item);
    }
}
