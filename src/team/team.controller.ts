import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, NotFoundException } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('new')
  async create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createMember(createTeamDto);
  }

  @Get('all')
  async findAll() {
    return this.teamService.findAll();
  }

  @Get(':memberId')
  async findOne(@Param('memberId') memberId: string) {
    return this.teamService.findMember(memberId);
  }

  @Patch('edit/:memberId')
  async update(@Param('memberId') memberId: string, @Body(new ValidationPipe()) updateTeamDto: UpdateTeamDto) {
    try {
      const updateMember = await this.teamService.updateMemberDetails(memberId, updateTeamDto);
      return updateMember;
    } catch (error) {
      if (error instanceof NotFoundException){
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete('drop/:memberId')
  async remove(@Param('memberId') memberId: string) {
    return this.teamService.removeMember(memberId);
  }
}
