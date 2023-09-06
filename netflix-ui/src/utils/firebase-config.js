import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDU25OCk7fmbIRtkfWuNxHkHSmoe5U1H6s",
    authDomain: "react-netflix-clone-58e7f.firebaseapp.com",
    projectId: "react-netflix-clone-58e7f",
    storageBucket: "react-netflix-clone-58e7f.appspot.com",
    messagingSenderId: "909502310061",
    appId: "1:909502310061:web:26eb6b55bb27241df78824",
    measurementId: "G-2B5V8TM1QX"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)