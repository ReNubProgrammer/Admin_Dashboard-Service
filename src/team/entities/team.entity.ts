import { GlobalEntity } from "src/_db/global.entity";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, ManyToMany} from "typeorm";

@Entity()
export class Team extends GlobalEntity<Team> {
    @Column({length:"3", unique: true})
    initial:string;

    @Column({length:"25", unique: true})
    name:string;

    @Column("varchar", {length: "30"})
    regional:string;

    @Column()
    nomor:string;

    @Column()
    bank:string;

    @Column()
    nobank:string;

    @ManyToMany(() => Order, order => order.fg_initials, {cascade: true, onDelete:'CASCADE'})
    order_fg: Order[];

    @ManyToMany(() => Order, order => order.vg_initials, {cascade:true, onDelete:'CASCADE'})
    order_vg: Order[];
}
