import { PrimaryGeneratedColumn } from "typeorm";

export class GlobalEntityId<GEID>{
    @PrimaryGeneratedColumn()
    id:number;

    constructor(entity: Partial<GEID>){
        Object.assign(this, entity);
    }
}