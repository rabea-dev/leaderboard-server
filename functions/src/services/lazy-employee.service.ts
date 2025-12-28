import {FirebaseService} from "./firebase.service";
import {LazyEmployeeDto} from "../models/lazy-employee";

export class LazyEmployeeService {
    private readonly collectionName = 'lazy-employees'; // Define the collection name for lazy employees

    constructor(private readonly firebaseService: FirebaseService = new FirebaseService()) {}

    // Create a lazy employee record
    async createLazyEmployee(lazyEmployeeDto: LazyEmployeeDto): Promise<{ id: string }> {
        const lazyEmployeeData = {
            ...lazyEmployeeDto,
            createdAt: lazyEmployeeDto.createdAt || new Date().toISOString()
        };
        return await this.firebaseService.createDocument(this.collectionName, lazyEmployeeData);
    }

    // Get all lazy employees
    async getAllLazyEmployees(): Promise<any[]> {
        return await this.firebaseService.getAllDocuments(this.collectionName);
    }

    // Get lazy employees by officeId
    async getLazyEmployeesByOffice(officeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByField(this.collectionName, 'officeId', officeId);
    }

    // Delete a lazy employee record
    async deleteLazyEmployee(lazyEmployeeId: string): Promise<void> {
        return await this.firebaseService.deleteDocument(this.collectionName, lazyEmployeeId);
    }
}

