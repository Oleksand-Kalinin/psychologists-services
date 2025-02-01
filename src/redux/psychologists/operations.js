import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref, remove, set } from "firebase/database";
import { getQueries, getQueriesNextPage } from "../../js/utils/queryFirebase.js";
import { sortPsychologists } from "../../js/utils/sort.js";
import { auth, database } from "../../../firebaseConfig.js";
import toast from "react-hot-toast";

const PER_PAGE = 4;

export const fetchPsychologists = createAsyncThunk(
    'psychologists/fetch',
    async (payload, thunkAPI) => {
        try {
            const { filterSearchParam, page = 1, locationPathName } = payload;

            const state = thunkAPI.getState();
            const lastItem = page > 1
                ? location.pathname === "/psychologists"
                    ? state.psychologists.psychologists.lastItem
                    : state.psychologists.favoritesPsychologists.lastItem
                : null;

            let limitItems, allItems, totalPages;

            if (page === 1) {
                const queries = getQueries(filterSearchParam, PER_PAGE, locationPathName);
                limitItems = queries.limitItems;
                allItems = queries.allItems;
            } else {
                limitItems = getQueriesNextPage(filterSearchParam, PER_PAGE, lastItem, locationPathName);
            }

            const [limitedResult, allResult] =
                page === 1
                    ? await Promise.all([get(limitItems), get(allItems)])
                    : [await get(limitItems), null];

            const limitedPsychologists = limitedResult.exists()
                ? Object.entries(limitedResult.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }))
                : [];

            // Додаткове сортування
            const sortedLimitedPsychologists = sortPsychologists(limitedPsychologists, filterSearchParam);

            // Підрахунок totalPages тільки для першої сторінки
            if (page === 1 && allResult?.exists()) {
                const totalPsychologistsCount = Object.entries(allResult.val()).length;
                totalPages = Math.ceil(totalPsychologistsCount / PER_PAGE);
            }

            // Останній елемент для наступної сторінки
            const lastFetchedItem = sortedLimitedPsychologists[sortedLimitedPsychologists.length - 1] || null;

            return {
                items: sortedLimitedPsychologists,
                lastItem: lastFetchedItem,
                ...(page === 1 && { totalPages }),
                page,
                locationPathName,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)



export const fetchFavoriteIds = createAsyncThunk(
    'favoritePsychologists/fetchFavoriteIds',
    async (_, thunkAPI) => {
        try {
            const user = auth.currentUser;
            const userId = user.uid;

            const favoritePsychologistsRef = ref(database, `favoritePsychologists/${userId}/favoriteIds`);

            const favoritePsychologists = await get(favoritePsychologistsRef);
            const favoriteIds = favoritePsychologists.exists() ? favoritePsychologists.val() : [];
            return favoriteIds;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
    {
        condition: (_, thunkApi) => {
            const state = thunkApi.getState();
            const token = state.auth.accessToken;

            if (token) return true;
            return false;
        },
    }
)



export const updateFavoritePsychologists = createAsyncThunk(
    'favoritePsychologists/updateFavoritePsychologists',
    async (payload) => {
        try {
            const user = auth.currentUser;

            if (!user) {
                throw new Error("User is not authenticated");
            }

            const userId = user.uid;
            const { isFavorite, item } = payload;
            const psychologistRef = ref(database, `favoritePsychologists/${userId}/psychologists/${item.id}`);
            const favoritesArrayRef = ref(database, `favoritePsychologists/${userId}/favoriteIds`);
            const snapshot = await get(favoritesArrayRef);
            const existingFavorites = snapshot.exists() ? snapshot.val() : [];

            if (isFavorite) {
                await remove(psychologistRef);
                const updatedFavorites = existingFavorites.filter(id => id !== item.id);
                await set(favoritesArrayRef, updatedFavorites);
                toast.success("Psychologist removed from favorites");
            }
            else {
                await set(psychologistRef, item);
                if (!existingFavorites.includes(item.id)) {
                    await set(favoritesArrayRef, [...existingFavorites, item.id]);
                }
                toast.success("Psychologist added to favorites");
            }

            return { isFavorite, item };
        } catch (error) {
            if (error.message === "User is not authenticated") {
                toast.success("Login to add to favorites");
                return;
            }
            toast.error(error.message);
        }
    }
)