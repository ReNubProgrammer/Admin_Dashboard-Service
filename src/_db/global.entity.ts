import { PrimaryGeneratedColumn } from "typeorm";

export class GlobalEntity<GE>{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    constructor(entity: Partial<GE>){
        Object.assign(this, entity);
    }
}