import {Body, Controller, Post} from '@nestjs/common';
import {TargetService} from "../services/target.service";
import {TargetDto} from "../models/target";

@Controller('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Post()
  async createTarget(@Body() targetDto: TargetDto) {
    return await this.targetService.createTarget(targetDto);
  }
}
