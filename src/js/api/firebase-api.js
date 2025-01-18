import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig.js";
import toast from "react-hot-toast";
import { closeModal } from "../../redux/modals/slice.js";


export const registerUser = async ({ userName, email, password }, navigate, dispatch) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: userName });

        toast.success(
            "Welcome! Your registration was successful, and you are now logged in."
        );

        navigate("/psychologists");
        dispatch(closeModal());

        console.log("User registered:", user);
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            toast.error("The email address is already in use by another account.");
        } else {
            toast.error("Registration failed. Please try again.");
        }

        console.error("Registration error:", error);
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
    } catch (error) {
        console.error("Login error:", error);
    }
};