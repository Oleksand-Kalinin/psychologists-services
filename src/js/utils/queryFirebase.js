import { limitToFirst, limitToLast, orderByChild, query, ref } from "firebase/database";
import { database } from "../../../firebaseConfig.js";

export const getQueries = (payload, perPage) => {
    const psychologistsRef = ref(database, "psychologists");

    const sortConfig = {
        "A to Z": { field: "name", limitMethod: limitToFirst },
        "Z to A": { field: "name", limitMethod: limitToLast },
        "Less than 10$": { field: "price_per_hour", limitMethod: limitToFirst },
        "Greater than 10$": { field: "price_per_hour", limitMethod: limitToLast },
        "Popular": { field: "rating", limitMethod: limitToLast },
        "Not popular": { field: "rating", limitMethod: limitToFirst },
    };

    const config = sortConfig[payload] || {};
    const { field = null, limitMethod = limitToFirst } = config;

    const limitItems = field
        ? query(psychologistsRef, orderByChild(field), limitMethod(perPage))
        : query(psychologistsRef, limitToFirst(perPage));

    const allItems = field
        ? query(psychologistsRef, orderByChild(field))
        : query(psychologistsRef);

    return {
        limitItems,
        allItems,
    };

}

