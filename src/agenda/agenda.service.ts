import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { GetAgendaByDate } from './dto/get-agenda-by-date.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agenda } from './entities/agenda.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepo: Repository<Agenda>
  ) { }

  async createAgenda(createAgendaDto: CreateAgendaDto) {
    try {
      const newAgenda = new Agenda({
        ...createAgendaDto
      })
      await this.agendaRepo.save(newAgenda);
    } catch (error) {
      return error
    }
  }

  async findAgendaById(id: string) {
    try {
      const agenda = await this.agendaRepo.findOne({
        where: { id }
      })
      return agenda;
    } catch (error) {
      return error
    }
  }

  async findAllAgendaBy(getDate: GetAgendaByDate) {
    try {
      const { from, to } = getDate;
      return await this.agendaRepo.find({
        where: {
          date: Between(from, to)
        },
        order: {
          date: "ASC"
        }
      });
    } catch (error) {
      return error
    }
  }

  async updateAgenda(id: string, updateAgendaDto: UpdateAgendaDto) {
    try {
      const agenda = await this.findAgendaById(id);
      if (!agenda) {
        throw new NotFoundException(`Packages ${id} not found`)
      }
      Object.assign(agenda, updateAgendaDto);

      this.agendaRepo.save(agenda);
    } catch (error) {
      return error;
    }
  }

  async removeAgenda(id: string) {
    try {
      await this.agendaRepo.delete(id);
    } catch (error) {
      throw new NotFoundException(`Order not found`);
    }
  }
}