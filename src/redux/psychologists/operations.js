import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, limitToFirst, orderByChild, query, ref } from "firebase/database";
import { database } from "../../../firebaseConfig.js";

const PER_PAGE = 4;

export const startFetchPsychologists = createAsyncThunk(
    'psychologists/startFetch',
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const psychologistsRef = ref(database, "psychologists");

            const queryLimitPsychologists = query(
                psychologistsRef,
                limitToFirst(PER_PAGE),
            );

            const queryAllPsychologists = query(
                psychologistsRef,
            );

            const [limitedResult, allResult] = await Promise.all([
                get(queryLimitPsychologists),
                get(queryAllPsychologists),
            ]);

            const limitedPsychologists = limitedResult.exists()
                ? Object.entries(limitedResult.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }))
                : [];

            const totalPsychologistsCount = allResult.exists()
                ? Object.entries(allResult.val()).length
                : null;

            const totalPages = Math.ceil(totalPsychologistsCount / PER_PAGE);

            return {
                items: limitedPsychologists,
                totalPages,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const testFn = async () => {
    console.log("start testFn");

    try {
        // Створюємо запит з сортуванням за полем "rating"
        const psychologistsRef = ref(database, "temp");
        const sortedQuery = query(
            psychologistsRef,
            orderByChild("name"),
            limitToFirst(5),
        );

        // Отримуємо дані
        const snapshot = await get(sortedQuery);

        if (snapshot.exists()) {
            const psychologists = snapshot.val();

            console.log("Відсортовані психологи (прямо з Firebase):", psychologists);
        } else {
            console.log("Дані відсутні.");
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
