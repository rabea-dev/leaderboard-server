import { Injectable } from '@nestjs/common';
import { db } from '../firebase-config'; // Import the initialized Firebase Firestore instance

@Injectable()
export class FirebaseService {
    // Create a new document in a collection
    async createDocument(collectionName: string, data: any): Promise<string> {
        const docRef = db.collection(collectionName).doc(); // Create a new document reference
        await docRef.set(data); // Set the document data in Firestore
        return docRef.id; // Return the document ID
    }

    // Get a document by ID from a collection
    async getDocument(collectionName: string, documentId: string): Promise<any> {
        const docRef = db.collection(collectionName).doc(documentId); // Get reference to document
        const doc = await docRef.get(); // Get the document snapshot
        if (!doc.exists) {
            throw new Error(`Document ${documentId} does not exist in collection ${collectionName}`);
        }
        return doc.data(); // Return the document data
    }

    // Get all documents in a collection
    async getAllDocuments(collectionName: string): Promise<any[]> {
        const collectionRef = db.collection(collectionName);
        const snapshot = await collectionRef.get(); // Get all documents in the collection
        if (snapshot.empty) {
            return []; // Return an empty array if no documents found
        }

        // Map over the documents and return their data
        const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return documents;
    }

    // Update a document by ID
    async updateDocument(collectionName: string, documentId: string, data: any): Promise<void> {
        const docRef = db.collection(collectionName).doc(documentId);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new Error(`Document ${documentId} does not exist in collection ${collectionName}`);
        }
        await docRef.update(data); // Update the document with the new data
    }

    // Delete a document by ID
    async deleteDocument(collectionName: string, documentId: string): Promise<void> {
        const docRef = db.collection(collectionName).doc(documentId);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new Error(`Document ${documentId} does not exist in collection ${collectionName}`);
        }
        await docRef.delete(); // Delete the document
    }

    // Generic query method to get documents by field value
    async getDocumentsByField(collectionName: string, fieldName: string, value: any): Promise<any[]> {
        const collectionRef = db.collection(collectionName);
        const snapshot = await collectionRef.where(fieldName, '==', value).get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
