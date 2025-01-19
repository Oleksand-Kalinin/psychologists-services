import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig.js";


export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
    } catch (error) {
        console.error("Login error:", error);
    }
};