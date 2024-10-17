import {Controller, Get, Param, Post, Body, Put, Delete, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import {EmployeeDto} from "../models/employee";
import {FileInterceptor} from "@nestjs/platform-express"; // Import EmployeeService

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // Create an employee
  // @Post()
  // async createEmployee(@Body() employeeDto: EmployeeDto) {
  //   return await this.employeeService.createEmployee(employeeDto);
  // }

  // Create an employee with an image (file upload support)
  @Post()
  @UseInterceptors(FileInterceptor('employeeImage')) // Intercepts 'employeeImage' field from FormData
  async createEmployee(
      @UploadedFile() file: Express.Multer.File,      // Handle the image file
      @Body() employeeDto: EmployeeDto                // Handle the form data as EmployeeDto
  ) {
    const imageUrl = file ? await this.employeeService.uploadEmployeeImage(file) : null;
    return await this.employeeService.createEmployeeWithImage(employeeDto, imageUrl);
  }

  // Get an employee by ID
  @Get(':id')
  async getEmployee(@Param('id') id: string) {
    return await this.employeeService.getEmployee(id);
  }

  // Get all employees
  // Get all employees, optionally filter by officeId using query parameter
  @Get()
  async getEmployees(@Query('officeId') officeId?: string) {
    if (officeId) {
      return await this.employeeService.getEmployeesByOffice(officeId); // Filter by officeId if query param is provided
    }
    return await this.employeeService.getAllEmployees(); // Return all employees if no query param is provided
  }
  
  // Update an employee by ID
  @Put(':id')
  async updateEmployee(@Param('id') id: string, @Body() employeeDto: EmployeeDto) {
    await this.employeeService.updateEmployee(id, employeeDto);
    return { message: `Employee with ID ${id} has been updated` };
  }

  // Delete an employee by ID
  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    await this.employeeService.deleteEmployee(id);
    return { message: `Employee with ID ${id} has been deleted` };
  }
}
