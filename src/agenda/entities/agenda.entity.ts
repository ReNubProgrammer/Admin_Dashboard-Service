import { IsDate } from "class-validator";
import { GlobalEntity } from "src/_db/global.entity";
import { IsUnique } from "src/validation/isunique";
import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Agenda extends GlobalEntity<Agenda> {
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    date: string;

    @Column()
    title: string;

    @Column()
    subtitle: string;
    
    @Column()
    description: string;

    @Column()
    status: string;
}
 