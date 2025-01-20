import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    createUserWithEmailAndPassword,
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
                // refreshToken: user.refreshToken
            };

        } catch (error) {

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
                // refreshToken: user.refreshToken
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