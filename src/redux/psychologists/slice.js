import { createSlice } from "@reduxjs/toolkit"
import { fetchPsychologists } from "./operations.js";

const INITIAL_STATE = {
    psychologists: {
        totalPages: null,
        items: [],
        lastItem: null,
    },
    favoritesPsychologists: {
        totalPages: null,
        items: [],
        lastItem: null,
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
                fetchPsychologists.pending,
                (state) => {
                    state.error = null;
                    state.isLoading = true;
                })
            .addCase(
                fetchPsychologists.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;

                    state.psychologists.totalPages = payload.totalPages;
                    state.psychologists.items = payload.items;
                    state.psychologists.lastItem = payload.lastItem;
                })
            .addCase(
                fetchPsychologists.rejected,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                })
    }
})



export const psychologistsReducer = psychologistsSlice.reducer;