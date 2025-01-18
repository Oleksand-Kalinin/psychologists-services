import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBGLCxeQO5xe9DiRmTDV-QV8MZpV5rwQ1s",
    authDomain: "psychologists-services-5e7e2.firebaseapp.com",
    projectId: "psychologists-services-5e7e2",
    storageBucket: "psychologists-services-5e7e2.firebasestorage.app",
    messagingSenderId: "797495501871",
    appId: "1:797495501871:web:0e15ce9eb58aeb626852da"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const db = getFirestore(app);