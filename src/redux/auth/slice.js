import { createSlice } from "@reduxjs/toolkit"
import { apiLogin, apiRegister } from "./operations";

const INITIAL_STATE = {
    user: {
        id: null,
        name: "Oleksandr",
        email: null,
    },
    accessToken: null,
    isLoggedIn: true,
    isRefreshing: false,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        resetError(state) {
            state.error = null;
        },
    },

    extraReducers(builder) {

        builder

            // Registration user
            .addCase(
                apiRegister.pending,
                (state) => {
                    state.isLoading = true;
                })
            .addCase(
                apiRegister.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.isLoggedIn = true;

                    state.user.id = payload.id;
                    state.user.name = payload.userName;
                    state.user.email = payload.email;
                    state.accessToken = payload.accessToken;
                })
            .addCase(
                apiRegister.rejected,
                (state) => {
                    state.isLoading = false;
                })

            // Login user
            .addCase(
                apiLogin.pending,
                (state) => {
                    state.isLoading = true;
                })
            .addCase(
                apiLogin.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.isLoggedIn = true;

                    state.user.id = payload.id;
                    state.user.name = payload.userName;
                    state.user.email = payload.email;
                    state.accessToken = payload.accessToken;
                })
            .addCase(
                apiLogin.rejected,
                (state) => {
                    state.isLoading = false;
                })

        // // Logout user
        // .addCase(apiLogout.pending,
        //     (state) => {
        //         state.error = null;
        //     })
        // .addCase(apiLogout.fulfilled, () => {
        //     return INITIAL_STATE;
        // })
        // .addCase(apiLogout.rejected,
        //     (state, { payload }) => {
        //         state.error = payload;
        //     })

        // // Refresh user
        // .addCase(apiRefreshUser.pending,
        //     (state) => {
        //         state.error = null;
        //         state.isRefreshing = true;
        //     })
        // .addCase(apiRefreshUser.fulfilled,
        //     (state, { payload }) => {
        //         state.isLoggedIn = true;
        //         state.user = payload;
        //         state.isRefreshing = false;
        //     })
        // .addCase(apiRefreshUser.rejected,
        //     (state, { payload }) => {
        //         state.error = payload;
        //         state.isRefreshing = false;
        //     })
    }
})


export const { resetError } = authSlice.actions;
export const authReducer = authSlice.reducer;