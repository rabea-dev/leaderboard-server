import {FirebaseService} from "../services/firebase.service";
import {TargetDto} from "../models/target";

export class TargetService {
    private readonly collectionName = 'targets'; // Define the collection name for targets

    constructor(private readonly firebaseService: FirebaseService = new FirebaseService()) {}

    // Create an target
    async createTarget(targetDto: TargetDto): Promise<{id: string}> {
        return await this.firebaseService.createDocument(this.collectionName, targetDto);
    }

    // Get an target by ID
    async getTarget(targetId: string): Promise<any> {
        return await this.firebaseService.getDocument(this.collectionName, targetId);
    }

    // Get all targets
    async getAllTargets(): Promise<any[]> {
        return await this.firebaseService.getAllDocuments(this.collectionName);
    }

    // Get targets by officeId
    async getTargetByEmployeeId(employeeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByField(this.collectionName, 'employeeId', employeeId);
    } 
    
    // Get targets by officeId
    async getTargetsByDateRange(from: string, to: string, officeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByMultipleFields(
            this.collectionName,
            'from', '==', from,   
            'to', '==', to
        );
    }

    // Update an target
    async updateTarget(targetId: string, targetDto: any): Promise<void> {
        return await this.firebaseService.updateDocument(this.collectionName, targetId, targetDto);
    }

    // Delete an target
    async deleteTarget(targetId: string): Promise<void> {
        return await this.firebaseService.deleteDocument(this.collectionName, targetId);
    }
}
