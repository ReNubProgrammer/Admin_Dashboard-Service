import { Column, Entity, ManyToOne} from "typeorm";
import { Product } from "./product.entity";
import { GlobalEntityId } from "src/db/globalid.entity";

@Entity()
export class Packages extends GlobalEntityId<Packages> {
    @Column ()
    name:string;

    @Column()
    price: number;

    @ManyToOne(()=> Product, packageName => packageName.packages)
    packageName: Product;
}
