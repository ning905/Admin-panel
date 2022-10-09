import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: "admin-panel-project-47b97.firebaseapp.com",
	projectId: "admin-panel-project-47b97",
	storageBucket: "admin-panel-project-47b97.appspot.com",
	messagingSenderId: "794014030134",
	appId: "1:794014030134:web:b3642c0a9aa97bdc71bb97",
	measurementId: "G-1EV3W7XBMG",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)
