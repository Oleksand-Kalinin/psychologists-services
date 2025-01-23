import { createSlice } from "@reduxjs/toolkit"
import { fetchPsychologistById, startFetchPsychologists } from "./operations.js";

const INITIAL_STATE = {
    psychologists: {
        totalItems: null,
        items: [],
        error: null,
        isLoading: false,
    },
    favoritesPsychologists: {
        totalItems: null,
        items: [],
        error: null,
        isLoading: false,
    },
    psychologistById: {
        item: null,
        isLoading: false,
    }
}

const psychologistsSlice = createSlice({
    name: "psychologists",
    initialState: INITIAL_STATE,

    reducers: {
        clearPsychologistById(state) {
            state.psychologistById.item = null;
        },
    },

    extraReducers(builder) {

        builder
            .addCase(
                startFetchPsychologists.pending,
                (state) => {
                    state.psychologists.isLoading = true;
                })
            .addCase(
                startFetchPsychologists.fulfilled,
                (state, { payload }) => {
                    state.psychologists.isLoading = false;

                    state.psychologists.totalItems = payload.totalItems;
                    state.psychologists.items = payload.items;
                })
            .addCase(
                startFetchPsychologists.rejected,
                (state, { payload }) => {
                    state.psychologists.isLoading = false;
                    state.psychologists.error = payload;
                })

            .addCase(
                fetchPsychologistById.pending,
                (state) => {
                    state.psychologistById.isLoading = true;
                })
            .addCase(
                fetchPsychologistById.fulfilled,
                (state, { payload }) => {
                    state.psychologistById.isLoading = false;
                    state.psychologistById.item = payload;
                })
            .addCase(
                fetchPsychologistById.rejected,
                (state, { payload }) => {
                    state.psychologistById.isLoading = false;
                    state.psychologistById.error = payload;
                })
    }
})



export const {
    clearPsychologistById
} = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;