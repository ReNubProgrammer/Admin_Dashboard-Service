import { ValidationOptions, registerDecorator } from "class-validator";
import { IsUniqueConstraint } from "./isunique.constraint";

export type IsUniqueConstraintInput = {
    table: string;
    column: string;
}

export function IsUnique(
    options : IsUniqueConstraintInput,
    validationOptions?: ValidationOptions
    ) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        name :'Is-Unique',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [options],
        validator: IsUniqueConstraint,
      });
    };
  }