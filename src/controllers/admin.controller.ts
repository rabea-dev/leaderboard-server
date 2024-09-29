import {Body, Controller, Post} from '@nestjs/common';
import {AdminService} from "../services/admin.service";
import {AdminDto} from "../models/admin";
 
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(@Body() adminDto: AdminDto) {
    return await this.adminService.createAdmin(adminDto);
  }
}
