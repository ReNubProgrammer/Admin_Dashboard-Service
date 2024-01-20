import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
    @Column()
    @Generated('uuid')
    id:number;

    @PrimaryColumn({length:"3"})
    initial:string;

    @Column({length:"25"})
    name:string;

    @Column("varchar", {length: "30"})
    regional:string;

    @Column()
    nomor:number;

    @Column()
    bank:string;

    @Column()
    nobank:number;

    @OneToMany(() => Order, fgorders => fgorders.fg)
    fgorders: Order[];

    @OneToMany(() => Order, fgorders => fgorders.vg)
    vgorders: Order[];

    constructor(item:Partial<Team>){
        Object.assign(this, item);
    }
}
