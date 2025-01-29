import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig.js";

export const checkUserAuth = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                reject("No authenticated user");
                return;
            }
            try {
                const token = await user.getIdToken(true);
                resolve({
                    id: user.uid,
                    email: user.email,
                    userName: user.displayName,
                    accessToken: token,
                });
            } catch (error) {
                reject(error.message);
            }
        });
    });
};
