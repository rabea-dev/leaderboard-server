import {Body, Controller, Get, Post} from '@nestjs/common';
import {EmployeeService} from "../services/employee.service";
import {EmployeeDto} from "../models/employee";

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() employeeDto: EmployeeDto) {
    return await this.employeeService.createEmployee(employeeDto);
  }
  
  @Get()
    async getEmployees() {
        return await this.employeeService.getEmployees();
    }
}
