import { createSlice } from "@reduxjs/toolkit"
import { startFetchPsychologists } from "./operations.js";

const INITIAL_STATE = {
    psychologists: {
        totalItems: null,
        items: [],
    },
    favoritesPsychologists: {
        totalItems: null,
        items: [],
    },
    error: null,
    isLoading: false,
}

const psychologistsSlice = createSlice({
    name: "psychologists",
    initialState: INITIAL_STATE,

    extraReducers(builder) {

        builder
            .addCase(
                startFetchPsychologists.pending,
                (state) => {
                    state.error = null;
                    state.isLoading = true;
                })
            .addCase(
                startFetchPsychologists.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;

                    state.psychologists.totalItems = payload.totalItems;
                    state.psychologists.items = payload.items;
                })
            .addCase(
                startFetchPsychologists.rejected,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                })
    }
})



export const psychologistsReducer = psychologistsSlice.reducer;