import { createSlice } from "@reduxjs/toolkit"
import { apiRegister } from "./operations";

const INITIAL_STATE = {
    user: {
        id: null,
        userName: null,
        email: null,
    },
    accessToken: null,
    isLoggedIn: false,
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

                    state.user.id = payload.uid;
                    state.user.name = payload.displayName;
                    state.user.email = payload.email;
                    state.accessToken = payload.accessToken;
                })
            .addCase(
                apiRegister.rejected,
                (state) => {
                    state.isLoading = false;
                })

        // Login user
        // .addCase(
        //     apiLogin.pending,
        //     (state) => {
        //         state.error = null;
        //     })
        // .addCase(
        //     apiLogin.fulfilled,
        //     (state, { payload }) => {
        //         state.isLoggedIn = true;
        //         state.token = payload.token;
        //         state.user = payload.user;
        //     })
        // .addCase(
        //     apiLogin.rejected,
        //     (state, { payload }) => {
        //         state.error = payload;
        //     })

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