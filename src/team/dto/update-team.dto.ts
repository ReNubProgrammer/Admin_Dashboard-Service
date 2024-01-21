import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsOptional, IsString} from 'class-validator';
import { IsUnique } from 'src/validation/isunique';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
    @IsOptional()
    @IsString({message:'Register with the correct exist typedata'})
    @IsUnique({
        table: 'team', 
        column: 'initial',
    }, {message:`Initial already exists. Choose another initial`})
    initial?: string;

    @IsOptional()
    @IsString({message:'Register with the correct exist typedata'})
    @IsUnique({
        table: 'team', 
        column: 'name',
    }, {message:`Name already exists. Choose another name`})
    name?:string;

    @IsOptional()
    @IsString({message:'Register with the correct exist typedata'})
    regional?:string;

    @IsOptional()
    @IsString({message:'Register with the correct exist typedata'})
    nomor?:string;

    @IsOptional()
    @IsString({message:'Register with the correct exist typedata'})
    bank?: string;

    @IsOptional()
    @IsString({message:'Register with the correct exist typedata'})
    nobank?:string;
}
