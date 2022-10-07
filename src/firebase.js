import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: "admin-panel-project-47b97.firebaseapp.com",
	projectId: "admin-panel-project-47b97",
	storageBucket: "admin-panel-project-47b97.appspot.com",
	messagingSenderId: "794014030134",
	appId: "1:794014030134:web:b3642c0a9aa97bdc71bb97",
	measurementId: "G-1EV3W7XBMG",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
