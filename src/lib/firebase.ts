import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXsSpGvgTR2hXlHHO-4ufZr-7xyJ66oHk",
    authDomain: "optimum-electricals-d6336.firebaseapp.com",
    projectId: "optimum-electricals-d6336",
    storageBucket: "optimum-electricals-d6336.appspot.com",
    messagingSenderId: "595100470612",
    appId: "1:595100470612:web:e9baa9a1cf5608e1d40cc1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
