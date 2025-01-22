import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, limitToFirst, query, ref } from "firebase/database";
import { database } from "../../../firebaseConfig.js";

const PER_PAGE = 3;

export const startFetchPsychologists = createAsyncThunk(
    'psychologists/startFetch',
    async (_, thunkAPI) => {
        try {

            const psychologistsRef = ref(database, "psychologists");

            const queryLimitPsychologists = query(
                psychologistsRef,
                limitToFirst(PER_PAGE),
            );

            const queryAllPsychologists = query(
                psychologistsRef,
            );

            const [limitedResult, allResult] = await Promise.all([
                get(queryLimitPsychologists),
                get(queryAllPsychologists),
            ]);

            const limitedPsychologists = limitedResult.exists()
                ? limitedResult.val()
                : [];

            const totalPsychologistsCount = allResult.exists()
                ? allResult.val().length
                : null;

            return {
                items: limitedPsychologists,
                totalItems: totalPsychologistsCount
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchPsychologistById = createAsyncThunk(
    'contacts/fetchAll',
    async (id, thunkAPI) => {
        try {
            const psychologistRef = ref(database, 'psychologists');
            const psychologist = await get(psychologistRef);
            console.log(psychologist.val());
            // return psychologist.val();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)