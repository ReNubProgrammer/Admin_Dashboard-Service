import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IsUniqueConstraintInput } from "./isunique";
import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
        private readonly entityManager: EntityManager
    ) { }
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const { table, column }: IsUniqueConstraintInput = args.constraints[0];
        const exist = await this.entityManager
            .getRepository(table)
            .createQueryBuilder(table)
            .where({ [column]: value })
            .getExists();

        return exist ? false : true;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        throw new Error("Credentials already exist");
    }

}