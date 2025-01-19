import { modalsReducer } from "./modals/slice.js";
import { authReducer } from "./auth/slice.js";
import { configureStore } from "@reduxjs/toolkit";

import {
    // persistStore,
    // persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

// import storage from "redux-persist/lib/storage";

// const trucksConfig = {
//     key: "trucksKey",
//     storage,
//     whitelist: ["trucksFavorite"],
// };

export const store = configureStore({
    reducer: {
        // trucks: persistReducer(trucksConfig, trucksReducer),
        modals: modalsReducer,
        auth: authReducer,
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

// export const persistor = persistStore(store);