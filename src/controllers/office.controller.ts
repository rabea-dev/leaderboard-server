import {Body, Controller, Get, Post} from '@nestjs/common';
import {OfficeService} from "../services/office.service";
import {OfficeDto} from "../models/office";

@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Post()
  async createOffice(@Body() officeDto: OfficeDto) {
    return await this.officeService.createOffice(officeDto);
  }
  @Get()
  async getAllOffices() {
    return await this.officeService.getOffices();
  }
}
