import { GlobalEntity } from "src/db/global.entity";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";

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

    // @OneToMany(() => Order, fgorders => fgorders.fg)
    // fgorders: Order[];

    // @OneToMany(() => Order, fgorders => fgorders.vg)
    // vgorders: Order[];
}
