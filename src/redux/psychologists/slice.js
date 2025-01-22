import { createSlice } from "@reduxjs/toolkit"
import { startFetchPsychologists } from "./operations.js";

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

}

const psychologistsSlice = createSlice({
    name: "psychologists",
    initialState: INITIAL_STATE,

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

    }
})


// export const { resetError } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;