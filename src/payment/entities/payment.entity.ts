import { GlobalEntity } from "src/db/global.entity";
import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment extends GlobalEntity<Payment> {
    @CreateDateColumn()
    createdAt: string;
    
    @Column()
    type: string;

    @Column()
    date: string;
    
    @Column()
    transaction: string;

    @Column()
    amount: string;

    @Column()
    destination: string;
}
