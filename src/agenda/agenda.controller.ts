import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { GetAgendaByDate } from './dto/get-agenda-by-date.dto';

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post('new')
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendaService.createAgenda(createAgendaDto);
  }

  @Get('all')
  findBy(
    @Query() query: GetAgendaByDate
  ) {
    return this.agendaService.findAllAgendaBy(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaService.findAgendaById(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAgendaDto: UpdateAgendaDto) {
    return this.agendaService.updateAgenda(id, updateAgendaDto);
  }

  @Delete('drop/:id')
  remove(@Param('id') id: string) {
    return this.agendaService.removeAgenda(id);
  }
}
