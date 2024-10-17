import {Controller, Get, Param, Post, Body, Put, Delete, Query} from '@nestjs/common';
import {TargetService} from "../services/target.service";
import {TargetDto} from "../models/target"; 

@Controller('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Post()
  async createTarget(@Body() targetDto: TargetDto) {
    return await this.targetService.createTarget(targetDto);
  }

  @Get('exact-date-range')
  async getTargetByExactDateRange(@Query('from') from: string, @Query('to') to: string, @Query('officeId') officeId: string) {
    return await this.targetService.getTargetsByDateRange(from, to, officeId);
  }
  @Get(':id')
  async getTarget(@Param('id') id: string) {
    return await this.targetService.getTarget(id);
  }
  
  @Put(':id')
  async updateTarget(@Param('id') id: string, @Body() targetDto: TargetDto) {
    await this.targetService.updateTarget(id, targetDto);
    return { message: `Target with ID ${id} has been updated` };
  }

  @Delete(':id')
  async deleteTarget(@Param('id') id: string) {
    await this.targetService.deleteTarget(id);
    return { message: `Target with ID ${id} has been deleted` };
  }
}
