import { createSlice } from "@reduxjs/toolkit"
import { fetchFavoriteIds, fetchPsychologists, updateFavoritePsychologists } from "./operations.js";

const INITIAL_STATE = {
    psychologists: {
        totalPages: null,
        items: [],
        lastItem: null,
    },
    favoritesPsychologists: {
        totalPages: null,
        items: [],
        favoriteIds: [],
        lastItem: null,
    },
    error: null,
    isLoading: false,
}

const psychologistsSlice = createSlice({
    name: "psychologists",
    initialState: INITIAL_STATE,

    reducers: {
        clearFavorites: (state) => {
            state.favoritesPsychologists.totalPages = null;
            state.favoritesPsychologists.items = [];
            state.favoritesPsychologists.favoriteIds = [];
            state.favoritesPsychologists.lastItem = null;
        }
    },

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

                    if (payload.page > 1) {
                        state.psychologists.items.push(...payload.items);
                    } else {
                        state.psychologists.items = payload.items;
                        state.psychologists.totalPages = payload.totalPages;
                    }

                    state.psychologists.lastItem = payload.lastItem;
                })
            .addCase(
                fetchPsychologists.rejected,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                })



            .addCase(
                fetchFavoriteIds.fulfilled,
                (state, { payload }) => {
                    state.favoritesPsychologists.favoriteIds = payload;
                })



            .addCase(
                updateFavoritePsychologists.fulfilled,
                (state, { payload }) => {
                    if (!payload) return;
                    const { isFavorite, item } = payload;
                    const favoriteIds = state.favoritesPsychologists.favoriteIds;
                    const items = state.favoritesPsychologists.items;

                    if (isFavorite) {
                        state.favoritesPsychologists.favoriteIds = favoriteIds.filter(id => id !== item.id);
                        state.favoritesPsychologists.items = items.filter(psychologist => psychologist.id !== item.id);
                    } else {
                        state.favoritesPsychologists.favoriteIds.push(item.id);
                        state.favoritesPsychologists.items.push(item);
                    }
                }
            )
    }
})


export const { clearFavorites } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;