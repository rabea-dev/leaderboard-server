import { Injectable } from '@nestjs/common';
import { db } from '../firebase-config';
import {AdminDto} from "../models/admin"; // Your Firebase config

@Injectable()
export class AdminService {
    // Create an admin document in the "admins" collection
    async createAdmin(adminDto: AdminDto): Promise<string> {
        const adminRef = db.collection('admins').doc(); // Create a new document reference in the "admins" collection
        await adminRef.set(adminDto); // Store the admin data in Firebase
        return adminRef.id; // Return the document ID of the created admin
    }
}
