import { createAsyncThunk } from "@reduxjs/toolkit";
import { endBefore, get, limitToFirst, limitToLast, orderByChild, orderByKey, query, ref, startAfter, startAt } from "firebase/database";
import { database } from "../../../firebaseConfig.js";
import { getQueries } from "../../js/utils/queryFirebase.js";
import { sort, sortPsychologists } from "../../js/utils/sort.js";

const PER_PAGE = 4;
// startAfter(lastItem[payload], lastItem.id)

export const fetchPsychologists = createAsyncThunk(
    'psychologists/fetch',
    async (payload, thunkAPI) => {
        try {
            const { filterSearchParam, page = 1 } = payload;

            // const state = thunkAPI.getState();
            // const lastItem = page > 1 ? state.psychologists.psychologists.lastItem : null;

            const {
                limitItems,
                allItems
            } = getQueries(filterSearchParam, PER_PAGE);

            const [limitedResult, allResult] = await Promise.all([
                get(limitItems),
                get(allItems),
            ]);

            const limitedPsychologists = limitedResult.exists()
                ? Object.entries(limitedResult.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }))
                : [];

            const sortedLimitedPsychologists = sortPsychologists(limitedPsychologists, filterSearchParam);

            const totalPsychologistsCount = allResult.exists()
                ? Object.entries(allResult.val()).length
                : null;

            const totalPages = Math.ceil(totalPsychologistsCount / PER_PAGE);
            const lastItem = sortedLimitedPsychologists[sortedLimitedPsychologists.length - 1] || null;

            return {
                items: sortedLimitedPsychologists,
                lastItem,
                totalPages,
            };
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)



export const testFn = createAsyncThunk("test/fetch",
    async () => {
        console.log("start testFn");

        try {

            const psychologistsRef = ref(database, "test");

            const sortName = "name";
            // const sortName = "rating";
            // const sortName = "price_per_hour";

            const limit = 4;
            let lastItem;

            // Без сортування
            // const sortedQuery = query(
            //     psychologistsRef,
            //     limitToFirst(limit),
            // );

            // З сортуванням за зростанням
            // const sortedQuery = query(
            //     psychologistsRef,
            //     orderByChild(sortName),
            //     limitToFirst(limit),
            // );

            // З сортуванням за спаданням
            const sortedQuery = query(
                psychologistsRef,
                orderByChild(sortName),
                limitToLast(limit),
            );

            // Отримуємо дані
            const snapshot = await get(sortedQuery);
            if (snapshot.exists()) {
                const psychologists = Object.entries(snapshot.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }));
                const sortedPsychologists = sort(psychologists, sortName, "desc");
                lastItem = sortedPsychologists[sortedPsychologists.length - 1];
                console.log("Стрічка психологів:", sortedPsychologists);
            } else {
                console.log("Дані відсутні.");
                return [];
            }

            // Далі

            // Без сортування
            // const nextSortedQuery = query(
            //     psychologistsRef,
            //     orderByKey(),
            //     startAfter(lastItem.id),
            //     limitToFirst(limit),
            // );

            // // З сортуванням за зростанням
            // const nextSortedQuery = query(
            //     psychologistsRef,
            //     startAfter(lastItem[sortName], lastItem.id),
            //     orderByChild(sortName),
            //     limitToFirst(limit),
            // );

            // З сортуванням за спаданням
            const nextSortedQuery = query(
                psychologistsRef,
                endBefore(lastItem[sortName]),
                orderByChild(sortName),
                limitToLast(limit),
            );


            // Отримуємо дані
            const nextSnapshot = await get(nextSortedQuery);
            if (nextSnapshot.exists()) {
                const psychologists = Object.entries(nextSnapshot.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }))
                const sortedPsychologists = sort(psychologists, sortName, "desc");
                lastItem = sortedPsychologists[sortedPsychologists.length - 1];
                console.log("Далі Стрічка психологів:", sortedPsychologists);
            } else {
                console.log("Далі Дані відсутні.");
                return [];
            }

            // Далі1

            // З сортуванням за зростанням
            // const next1SortedQuery = query(
            //     psychologistsRef,
            //     startAfter(lastItem[sortName], lastItem.id),
            //     orderByChild(sortName),
            //     limitToFirst(limit),
            // );


            // З сортуванням за спаданням
            const next1SortedQuery = query(
                psychologistsRef,
                endBefore(lastItem[sortName]),
                orderByChild(sortName),
                limitToLast(limit),
            );


            // Отримуємо дані
            const next1Snapshot = await get(next1SortedQuery);
            if (nextSnapshot.exists()) {
                const psychologists = Object.entries(next1Snapshot.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }))
                const sortedPsychologists = sort(psychologists, sortName, "desc");
                lastItem = sortedPsychologists[sortedPsychologists.length - 1];
                console.log("Далі1 Стрічка психологів:", sortedPsychologists);
            } else {
                console.log("Далі1 Дані відсутні.");
                return [];
            }


        } catch (error) {
            console.error("Помилка при отриманні даних:", error);
        }


        // Find psychologist by ID
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


