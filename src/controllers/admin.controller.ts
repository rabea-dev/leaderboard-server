import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import {FirebaseService} from "../services/firebase.serivce";
import {AdminDto} from "../models/admin";

@Controller('admin')
export class AdminController {
  constructor(private readonly firebaseService: FirebaseService) {}

  // Create an admin document
  @Post()
  async createAdmin(@Body() adminDto: AdminDto) {
    return await this.firebaseService.createDocument('admins', adminDto); // Create admin document
  }

  // Get an admin document by ID
  @Get(':id')
  async getAdmin(@Param('id') id: string) {
    return await this.firebaseService.getDocument('admins', id); // Get admin by ID
  }

  // Get all admin documents
  @Get()
  async getAllAdmins() {
    return await this.firebaseService.getAllDocuments('admins'); // Get all admins
  }

  // Update an admin document by ID
  @Put(':id')
  async updateAdmin(@Param('id') id: string, @Body() adminDto: AdminDto) {
    await this.firebaseService.updateDocument('admins', id, adminDto); // Update admin document
    return { message: `Admin with ID ${id} has been updated` };
  }

  // Delete an admin document by ID
  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    await this.firebaseService.deleteDocument('admins', id); // Delete admin document
    return { message: `Admin with ID ${id} has been deleted` };
  }
}
