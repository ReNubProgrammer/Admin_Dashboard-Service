import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Order } from "../orders/entities/order.entity";

export enum MonthName {
    Jan = "January",
    Feb = "February",
    Mar = "March",
    Apr = "April",
    May = "May",
    Jun = "June",
    Jul = "July",
    Aug = "August",
    Sept = "September",
    Oct = "October",
    Nov = "November",
    Dec = "December",
}

@Entity()
export class Months {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ type: "enum", enum: MonthName})
    month: MonthName;

    @OneToMany(() => Order, orders => orders.month)
    orders: Order[];
}