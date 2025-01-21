import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    sortBy: "Show all",
};



const filtersSlice = createSlice({
    name: "filters",
    initialState: INITIAL_STATE,
    reducers: {
        changeFilter(state, { payload }) {
            state.sortBy = payload;
        },
    },
});

export const { changeFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;