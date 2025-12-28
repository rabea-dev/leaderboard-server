import {Controller, Get, Post, Body, Query} from '@nestjs/common';
import {LazyEmployeeService} from '../services/lazy-employee.service';
import {LazyEmployeeDto} from "../models/lazy-employee";

@Controller('lazy-employee')
export class LazyEmployeeController {
  constructor(private readonly lazyEmployeeService: LazyEmployeeService = new LazyEmployeeService()) {}

  // Create a lazy employee record
  @Post()
  async setLazyEmployee(@Body() lazyEmployeeDto: LazyEmployeeDto) {
    return await this.lazyEmployeeService.createLazyEmployee(lazyEmployeeDto);
  }

  // Get lazy employees, optionally filter by officeId using query parameter
  @Get()
  async getLazyEmployees(@Query('officeId') officeId?: string) {
    if (officeId) {
      return await this.lazyEmployeeService.getLazyEmployeesByOffice(officeId); // Filter by officeId if query param is provided
    }
    return await this.lazyEmployeeService.getAllLazyEmployees(); // Return all lazy employees if no query param is provided
  }
}

