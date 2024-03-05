import { IsString } from "class-validator";
import { IsUnique } from "src/validation/isunique";

export class CreateAgendaDto {
    date: string;
    @IsString()
    @IsUnique({
        table: 'agenda',
        column: 'title'
    }, { message: 'Agenda already exist. Try another' })
    title: string;
    subtitle: string;
    description: string;
    status: string;
}
