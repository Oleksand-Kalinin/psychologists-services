import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref, set } from "firebase/database";
import { getQueries, getQueriesNextPage } from "../../js/utils/queryFirebase.js";
import { sortPsychologists } from "../../js/utils/sort.js";
import { auth, database } from "../../../firebaseConfig.js";

const PER_PAGE = 4;

export const fetchPsychologists = createAsyncThunk(
    'psychologists/fetch',
    async (payload, thunkAPI) => {
        try {
            const { filterSearchParam, page = 1 } = payload;

            const state = thunkAPI.getState();
            const lastItem = page > 1 ? state.psychologists.psychologists.lastItem : null;

            let limitItems, allItems, totalPages;

            if (page === 1) {
                const queries = getQueries(filterSearchParam, PER_PAGE);
                limitItems = queries.limitItems;
                allItems = queries.allItems;
            } else {
                limitItems = getQueriesNextPage(filterSearchParam, PER_PAGE, lastItem);
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
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)



export const fetchFavoriteIds = createAsyncThunk(
    'favoritePsychologists/fetchFavoriteIds',
    async (_, thunkAPI) => {
        console.log("start");

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



export const testFn = createAsyncThunk("test/fetch",
    async (payload) => {
        console.log("start testFn");


        // // запис даних в firebase
        // try {

        //     const user = auth.currentUser;

        //     const testData = {
        //         psychologists: {
        //             [payload.id]: payload,
        //         },
        //         favoriteIds: [payload.id]
        //     };

        //     console.log(testData);
        //     set(ref(database, `favoritePsychologists/${user.uid}`), testData)
        //         .then(() => console.log("Дані додані успішно"))
        //         .catch((error) => console.error("Помилка:", error));

        // }
        // catch (error) {
        //     console.log(error);
        // }


        // // Find psychologist by ID
        // const id = "5b24a5c7-1215-41ed-bd92-b234460bd056";
        // try {
        //     const psychologistRef = ref(database, `psychologists/${id}`); // Посилання на вузол
        //     const snapshot = await get(psychologistRef); // Отримання даних
        //     if (snapshot.exists()) {
        //         const psychologist = snapshot.val();
        //         console.log("Психолог знайдений:", psychologist);
        //         return psychologist;
        //     } else {
        //         console.log("Психолог з таким ID не знайдений.");
        //         return null;
        //     }
        // } catch (error) {
        //     console.error("Помилка при отриманні даних:", error);
        // }
    }

)


