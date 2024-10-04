import * as admin from 'firebase-admin';
import * as path from 'path'; // Import path to handle file paths

const serviceAccount = require('./config/firebase-service-account.json'); // Replace with your service account key file path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
