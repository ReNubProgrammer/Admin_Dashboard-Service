import { Column, Entity, Generated, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Packages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column ()
    name:string;

    @Column()
    price: number;

    @ManyToOne(()=> Product, product => product.packages,{onDelete:'CASCADE'})
    product: Product;
}
