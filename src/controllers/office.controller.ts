import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import {FirebaseService} from "../services/firebase.serivce";
import {OfficeDto} from "../models/office";

@Controller('office')
export class OfficeController {
  constructor(private readonly firebaseService: FirebaseService) {}

  // Create an office document
  @Post()
  async createOffice(@Body() officeDto: OfficeDto) {
    return await this.firebaseService.createDocument('offices', officeDto); // Create office document
  }

  // Get an office document by ID
  @Get(':id')
  async getOffice(@Param('id') id: string) {
    return await this.firebaseService.getDocument('offices', id); // Get office by ID
  }

  // Get all office documents
  @Get()
  async getAllOffices() {
    return await this.firebaseService.getAllDocuments('offices'); // Get all offices
  }

  // Update an office document by ID
  @Put(':id')
  async updateOffice(@Param('id') id: string, @Body() officeDto: OfficeDto) {
    await this.firebaseService.updateDocument('offices', id, officeDto); // Update office document
    return { message: `Office with ID ${id} has been updated` };
  }

  // Delete an office document by ID
  @Delete(':id')
  async deleteOffice(@Param('id') id: string) {
    await this.firebaseService.deleteDocument('offices', id); // Delete office document
    return { message: `Office with ID ${id} has been deleted` };
  }
}
