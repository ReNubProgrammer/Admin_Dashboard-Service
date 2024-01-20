import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user: string;

    @Column()
    name:string;

    @Column()
    pass:string;

    constructor(item:Partial<Admin>){
        Object.assign(this,item);
    }
}
