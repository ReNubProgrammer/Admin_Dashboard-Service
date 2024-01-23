import { GlobalEntity } from "src/db/global.entity";
import { Product } from "src/products/entities/product.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order extends GlobalEntity<Order> {
    @Column("date")
    date: number;

    @Column()

    @Column({ length: "10" })
    customer_name: string;

    @Column()
    email: string;

    @Column({ length: "6" })
    gender: string;

    @Column("time")
    time: number;

    @ManyToOne(() => Product, product => product.orders, 
    { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
    product: Product

    @ManyToMany(() => Team, team => team.order_fg)
    @JoinTable({
        name: 'orderfg_team',
    })
    fg_initials: Team[];

    @ManyToMany(() => Team, team => team.order_vg)
    @JoinTable({
        name: 'ordervg_team',
    })
    vg_initials: Team[];
}
