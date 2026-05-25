import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Read Vite env vars (prefix with VITE_). Leave empty strings as safe defaults.
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
	appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

const app = initializeApp(firebaseConfig);

// Export `auth` used by the app pages.
export const auth = getAuth(app);

// If you don't have Firebase config yet, create a `.env` file in the frontend
// folder with VITE_FIREBASE_* variables or leave them blank for UI development.
