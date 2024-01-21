import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
  ) { }
  
  async uniqueCheck(id: string){
    const member = await this.teamRepo.findOne({
      where: { id }
    })
    return member.id;
  }

  async createMember(createMemberDto: CreateTeamDto) {
    const newMember = new Team({
      ...createMemberDto
    });
    const existMember = await this.teamRepo.findOne({
      where: { name: newMember.name }
    })
    if (existMember) {
      throw new ConflictException('Member has already registered')
    }
    await this.teamRepo.save(newMember);
    return 'Member created';
  }

  async findAll() {
    const findAllMember = await this.teamRepo.find()
    return findAllMember;
  }

  async findMember(id: string | undefined) {
    const member = await this.teamRepo.findOne({
      where: { id }
    })
    if (!member) {
      throw new NotFoundException(`Member ${member.name} not found`)
    }
    return member;
  }

  async updateMemberDetails(id: string, updateTeamDto: UpdateTeamDto) {
    const member = await this.findMember(id);

    if(member){
      Object.assign(member, updateTeamDto);
      await this.teamRepo.save(member);
    } else {
      throw new NotFoundException(`User ${member.name} not found`)
    }
    return `User ${member.name} updated`
  }

  async removeMember(id: string) {
    const member = await this.findMember(id)
    return `Member ${member.name} removed from team` 
      + await this.teamRepo.delete(id);
  }
}
