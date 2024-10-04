import { Injectable } from '@nestjs/common';
import {FirebaseService} from "./firebase.serivce";
import {EmployeeDto} from "../models/employee";

@Injectable()
export class EmployeeService {
    private readonly collectionName = 'employees'; // Define the collection name for employees

    constructor(private readonly firebaseService: FirebaseService) {}

    // Create an employee
    async createEmployee(employeeDto: EmployeeDto): Promise<string> {
        return await this.firebaseService.createDocument(this.collectionName, employeeDto);
    }

    // Get an employee by ID
    async getEmployee(employeeId: string): Promise<any> {
        return await this.firebaseService.getDocument(this.collectionName, employeeId);
    }

    // Get all employees
    async getAllEmployees(): Promise<any[]> {
        return await this.firebaseService.getAllDocuments(this.collectionName);
    }

    // Get employees by officeId
    async getEmployeesByOffice(officeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByField(this.collectionName, 'officeId', officeId);
    }

    // Update an employee
    async updateEmployee(employeeId: string, employeeDto: any): Promise<void> {
        return await this.firebaseService.updateDocument(this.collectionName, employeeId, employeeDto);
    }

    // Delete an employee
    async deleteEmployee(employeeId: string): Promise<void> {
        return await this.firebaseService.deleteDocument(this.collectionName, employeeId);
    }
}
