import { endBefore, limitToFirst, limitToLast, orderByChild, orderByKey, query, ref, startAfter } from "firebase/database";
import { auth, database } from "../../../firebaseConfig.js";

export const getQueries = (filterSearchParam, perPage, locationPathName) => {
    // const psychologistsRef = ref(database, "psychologists");
    const psychologistsRef = locationPathName === "/psychologists" ? ref(database, "psychologists") : ref(database, `favoritePsychologists/${auth.currentUser.uid}/psychologists`);

    const sortConfig = {
        "A to Z": { field: "name", limitMethod: limitToFirst },
        "Z to A": { field: "name", limitMethod: limitToLast },
        "Less than 10$": { field: "price_per_hour", limitMethod: limitToFirst },
        "Greater than 10$": { field: "price_per_hour", limitMethod: limitToLast },
        "Popular": { field: "rating", limitMethod: limitToLast },
        "Not popular": { field: "rating", limitMethod: limitToFirst },
    };

    const config = sortConfig[filterSearchParam] || {};
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



export const getQueriesNextPage = (filterSearchParam, perPage, lastItem, locationPathName) => {
    // const psychologistsRef = ref(database, "psychologists");
    const psychologistsRef = locationPathName === "/psychologists" ? ref(database, "psychologists") : ref(database, `favoritePsychologists/${auth.currentUser.uid}/psychologists`);


    const sortConfig = {
        "A to Z": { field: "name", limitMethod: limitToFirst, direction: "asc" },
        "Z to A": { field: "name", limitMethod: limitToLast, direction: "desc" },
        "Less than 10$": { field: "price_per_hour", limitMethod: limitToFirst, direction: "asc" },
        "Greater than 10$": { field: "price_per_hour", limitMethod: limitToLast, direction: "desc" },
        "Popular": { field: "rating", limitMethod: limitToLast, direction: "desc" },
        "Not popular": { field: "rating", limitMethod: limitToFirst, direction: "asc" },
    };

    const config = sortConfig[filterSearchParam] || {};
    const { field = null, limitMethod = limitToFirst, direction = "asc" } = config;

    let limitItems;

    if (field) {
        limitItems =
            direction === "asc"
                ? query(
                    psychologistsRef,
                    orderByChild(field),
                    startAfter(lastItem[field], lastItem.id),
                    limitMethod(perPage)
                )
                : query(
                    psychologistsRef,
                    orderByChild(field),
                    endBefore(lastItem[field], lastItem.id),
                    limitMethod(perPage)
                );
    } else {
        limitItems = query(
            psychologistsRef,
            orderByKey(),
            startAfter(lastItem.id),
            limitToFirst(perPage)
        );
    }

    return limitItems;
};

