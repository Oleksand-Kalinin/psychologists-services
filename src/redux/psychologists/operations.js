import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, limitToFirst, orderByChild, query, ref } from "firebase/database";
import { database } from "../../../firebaseConfig.js";
import { getQueries } from "../../js/utils/queryFirebase.js";

const PER_PAGE = 4;

export const startFetchPsychologists = createAsyncThunk(
    'psychologists/startFetch',
    async (payload, thunkAPI) => {
        try {
            const { limitItems, allItems } = getQueries(payload, PER_PAGE);

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
        const psychologistsRef = ref(database, "psychologists");
        const sortedQuery = query(
            psychologistsRef,
            orderByChild("rating"),
            limitToFirst(PER_PAGE),
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
