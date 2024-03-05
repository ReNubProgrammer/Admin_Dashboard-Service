import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDto } from './create-agenda.dto';
import { IsOptional } from 'class-validator';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
    @IsOptional()
    date?: string;

    @IsOptional()
    title?: string;

    @IsOptional()
    subtitle?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    status?: string;
}
