import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAQmIwXIa2k14pVdq6aYqaZVVujgFnsSno",
    authDomain: "vinayaga-crackers-e2976.firebaseapp.com",
    projectId: "vinayaga-crackers-e2976",
    storageBucket: "vinayaga-crackers-e2976.firebasestorage.app",
    messagingSenderId: "385227860658",
    appId: "1:385227860658:web:c7abdc882f651cbaf177ab",
    measurementId: "G-STQDCSMTEB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
let analyticsInstance = null;
try {
    if (typeof window !== 'undefined') {
        analyticsInstance = getAnalytics(app);
    }
} catch (e) {
    // Analytics not supported in this environment
}
export const analytics = analyticsInstance;
export default app;
