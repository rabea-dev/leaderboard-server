import * as admin from 'firebase-admin';
// Import path to handle file paths

const serviceAccount = require('./config/firebase-service-account.json'); // Replace with your service account key file path

admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
    storageBucket: 'leaderboard-dff2d.appspot.com', // Replace with your Firebase project's storage bucket URL
});

export const db = admin.firestore();
export const bucket = admin.storage().bucket(); 