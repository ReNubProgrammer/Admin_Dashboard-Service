import { GlobalEntity } from "src/db/global.entity";
import { Product } from "src/products/entities/product.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, UpdateDateColumn } from "typeorm";
import { Months } from "../../db/month.entity";

@Entity()
export class Order extends GlobalEntity<Order> {
    @CreateDateColumn()
    createdat: number;

    @UpdateDateColumn()
    lastupdate: number;

    @Column("date")
    date: number;

    @Column({ length: "10" })
    customer_name: string;

    @Column()
    email: string;

    @Column({ length: "6" })
    gender: string;

    @Column()
    book_time: string;

    @Column()
    status: string;

    @ManyToOne(() => Product, product => product.orders,
        { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
    product: Product

    @ManyToOne(()=> Months, month => month.orders)
    month: Months

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
