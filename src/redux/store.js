import { modalsReducer } from "./modals/slice.js";
import { authReducer } from "./auth/slice.js";
import { filtersReducer } from "./filters/slice.js";

import { configureStore } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const authConfig = {
    key: "accessToken",
    storage,
    whitelist: ["accessToken"],
};

export const store = configureStore({
    reducer: {
        modals: modalsReducer,
        auth: persistReducer(authConfig, authReducer),
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            {
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }
        ),
});

export const persistor = persistStore(store);