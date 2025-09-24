import {FirebaseService} from "../services/firebase.service";
import {PromotionDto} from "../models/promotion";

export class PromotionService {
    private readonly collectionName = 'promotions'; // Define the collection name for targets

    constructor(private readonly firebaseService: FirebaseService = new FirebaseService()) {}

    // Create a promotion
    async createPromotion(promotionDto: PromotionDto): Promise<{id: string}> {
        return await this.firebaseService.createDocument(this.collectionName, promotionDto);
    }

    // Get an promotion by ID
    async getPromotion(promotionId: string): Promise<any> {
        return await this.firebaseService.getDocument(this.collectionName, promotionId);
    }

    // Get all promotions
    async getAllPromotions(): Promise<any[]> {
        return await this.firebaseService.getAllDocuments(this.collectionName);
    }

    // Get promotions by officeId
    async getPromotionByOfficeId(officeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByField(this.collectionName, 'officeId', officeId);
    } 
    
    // Get promotions by officeId
    async getPromotionsByDateRange(date: string, officeId: string): Promise<any[]> {
        return await this.firebaseService.getDocumentsByMultipleFields(
            this.collectionName,
            'fromDate', '==', date,   
            'officeId', '==', officeId
        );
    }

    // Update an promotion
    async updatePromotion(promotionId: string, promotionDto: any): Promise<void> {
        return await this.firebaseService.updateDocument(this.collectionName, promotionId, promotionDto);
    }

    // Delete an promotion
    async deletePromotion(promotionId: string): Promise<void> {
        return await this.firebaseService.deleteDocument(this.collectionName, promotionId);
    }
}
