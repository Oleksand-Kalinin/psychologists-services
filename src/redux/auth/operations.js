import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { auth } from "../../../firebaseConfig.js";


export const apiRegister = createAsyncThunk(
    "auth/register",
    async (payload, thunkApi) => {

        try {
            const { userName, email, password } = payload;

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: userName });

            return {
                id: user.uid,
                email: user.email,
                userName: user.displayName,
                accessToken: user.accessToken,
            };

        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.code);
        }
    }
);



export const apiLogin = createAsyncThunk(
    "auth/login",
    async (payload, thunkApi) => {

        try {
            const { email, password } = payload;

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            return {
                id: user.uid,
                email: user.email,
                userName: user.displayName,
                accessToken: user.accessToken,
            };

        } catch (error) {

            return thunkApi.rejectWithValue(error.code);
        }
    }
);



export const apiLogout = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) => {

        try {
            await signOut(auth);
        } catch (error) {
            return thunkApi.rejectWithValue(error.code);
        }
    }
);



export const apiRefreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkApi) => {
        try {
            const user = auth.currentUser;

            const token = await user.getIdToken(true);

            return {
                id: user.uid,
                email: user.email,
                userName: user.displayName,
                accessToken: token,
            };
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.message);
        }
    },
    {
        condition: () => {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, (user) => {
                    resolve(!!user);
                });
            });
        },
    }
);