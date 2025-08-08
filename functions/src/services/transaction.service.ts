import {FirebaseService} from "../services/firebase.service";
import {TransactionDto} from "../models/transaction";

export class TransactionService {
    private readonly collectionName = 'transactions'; // Define the collection name for transactions

    constructor(private readonly firebaseService: FirebaseService = new FirebaseService()) {}

    // Create an transaction
    async createTransaction(transactionDto: TransactionDto): Promise<{id: string}> {
        return await this.firebaseService.createDocument(this.collectionName, transactionDto);
    }

    // Get an transaction by ID
    async getTransaction(transactionId: string): Promise<any> {
        return await this.firebaseService.getDocument(this.collectionName, transactionId);
    }

    // Get all transactions
    async getAllTransactions(): Promise<any[]> {
        return await this.firebaseService.getAllDocuments(this.collectionName);
    }

    async getTransactionByEmployeeId(employeeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByField(this.collectionName, 'employeeId', employeeId);
    }
    
    async getTransactionsByExactDate(date: string, officeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByMultipleFields(
            this.collectionName,
            'date', '==', date,
            'officeId', '==', officeId
        );
    }

    async getTransactionsByMonth(monthKey: string, officeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByMultipleFields(
            this.collectionName,
            'monthKey', '==', monthKey,
            'officeId', '==', officeId,
        );
    }

    // Update an transaction
    async updateTransaction(transactionId: string, transactionDto: any): Promise<void> {
        return await this.firebaseService.updateDocument(this.collectionName, transactionId, transactionDto);
    }

    // Delete an transaction
    async deleteTransaction(transactionId: string): Promise<void> {
        return await this.firebaseService.deleteDocument(this.collectionName, transactionId);
    }

    async getTransactionByOffice(officeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByField(this.collectionName, 'officeId', officeId);
    }

}
