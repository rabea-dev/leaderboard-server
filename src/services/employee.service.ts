import {Injectable} from '@nestjs/common';
import {Employee, EmployeeDto} from "../models/employee";
import {generateUniqueString} from "../string.utils";

@Injectable()
export class EmployeeService {
    async createEmployee(employeeDto: EmployeeDto) {
        const employee: Employee = {
            id: generateUniqueString(),
            ...employeeDto
        };
        return {
            message: 'Employee created successfully',
            admin: employee
        }
    }
    
    async getEmployees(): Promise<Employee[]> {
        return Promise.resolve(
            [{id: '1', name: 'Mohammad', birthDate: '1990-01-01', officeId: '1'}, {id: '2', name: 'Ahmad', birthDate: '1995-01-01', officeId: '2'}, {id: '3', name: 'Ali', birthDate: '2000-01-01', officeId: '3'}]
        );
    }
}
