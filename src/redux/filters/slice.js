import { createSlice } from "@reduxjs/toolkit";
import { parsedFilter } from "../../js/utils/parsedFilter.js";

const INITIAL_STATE = {
    sortBy: "Show all",
};



const filtersSlice = createSlice({
    name: "filters",
    initialState: INITIAL_STATE,
    reducers: {
        changeFilter(state, { payload }) {
            const filter = parsedFilter(payload);
            state.sortBy = filter;
        },
    },
});

export const { changeFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;