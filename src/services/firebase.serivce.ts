import {Injectable} from '@nestjs/common';
import {bucket, db} from '../firebase-config'; // Import the initialized Firebase Firestore instance
import {v4 as uuidv4} from 'uuid';  // To generate unique filenames

@Injectable()
export class FirebaseService {
    // Create a new document in a collection
    async createDocument(collectionName: string, data: any): Promise<{ id: string }> {
        const docRef = db.collection(collectionName).doc(); // Create a new document reference
        await docRef.set(data); // Set the document data in Firestore
        return {id: docRef.id}; // Return the document ID
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
        const documents = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
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
        return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    }

    // Query documents by two fields (e.g., from and to dates)
    async getDocumentsByMultipleFields(
        collectionName: string,
        field1: string,
        operator1: FirebaseFirestore.WhereFilterOp,
        value1: any,
        field2: string,
        operator2: FirebaseFirestore.WhereFilterOp,
        value2: any,
        field3?: string,
        operator3?: FirebaseFirestore.WhereFilterOp,
        value3?: any
    ): Promise<any[]> {
        const collectionRef = db.collection(collectionName);
        let snapshot;
        if (field3 && operator3 && value3) {
            snapshot = await collectionRef
                .where(field1, operator1, value1)
                .where(field2, operator2, value2)
                .where(field3, operator3, value3)
                .get();
        } else {
            snapshot = await collectionRef
                .where(field1, operator1, value1)
                .where(field2, operator2, value2)
                .get();
        }
        
        if (snapshot.empty) {
            return []; // Return an empty array if no documents are found
        }

        return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const fileName = `${uuidv4()}_${file.originalname}`;  // Generate a unique file name
        const fileUpload = bucket.file(fileName);  // Create a reference to the storage location

        // Upload the file to Firebase Storage
        await fileUpload.save(file.buffer, {
            metadata: {
                contentType: file.mimetype,  // Ensure the correct MIME type
            },
        });

        // Make the file publicly accessible and return its URL
        await fileUpload.makePublic();
        return fileUpload.publicUrl();
    }
}
