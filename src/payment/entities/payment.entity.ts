import { IsDate } from "class-validator";
import { GlobalEntity } from "src/_db/global.entity";
import { Column, CreateDateColumn, Entity} from "typeorm";

@Entity()
export class Payment extends GlobalEntity<Payment> {
    @CreateDateColumn()
    createdAt: string;

    @Column()
    type: string;

    @Column()
    @IsDate()
    date: string;
    
    @Column()
    transaction: string;

    @Column()
    amount: string;

    @Column()
    destination: string;
}
