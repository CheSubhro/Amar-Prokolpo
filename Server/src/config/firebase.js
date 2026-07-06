
import { readFileSync } from 'fs';
import path from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const serviceAccountPath = path.resolve('./src/config/serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!getApps().length) {
    initializeApp({
        credential: cert(serviceAccount)
    });
}

const messaging = getMessaging();

export { messaging };
export default initializeApp;