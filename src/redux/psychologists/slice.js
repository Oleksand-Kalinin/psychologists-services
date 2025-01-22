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
    psychologistById: {
        item: null,
        isLoading: false,
    }
}

const psychologistsSlice = createSlice({
    name: "psychologists",
    initialState: INITIAL_STATE,

    reducers: {
        getPsychologistById(state, { payload }) {
            console.log(payload);
            console.log(state.psychologists.items);
            // const psychologist = state.psychologists.items.find(psychologist => psychologist.id === payload);

            // state.psychologistById.item = psychologist;
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

    }
})


export const {
    getPsychologistById
} = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;