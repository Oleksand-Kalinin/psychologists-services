import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
    modalType: null,
    isOpen: false,
};

const modalsSlice = createSlice({
    name: "modals",
    initialState: INITIAL_STATE,
    reducers: {
        openModal(state, { payload }) {
            state.isOpen = true;
            state.modalType = payload;
        },

        closeModal(state) {
            state.isOpen = false;
            state.modalType = null;
        },
    },

});

export const {
    openModal,
    closeModal,
} = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
