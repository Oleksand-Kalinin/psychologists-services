import { limitToFirst, limitToLast, orderByChild, query, ref } from "firebase/database";
import { database } from "../../../firebaseConfig.js";

export const getQueries = (payload, perPage) => {
    const psychologistsRef = ref(database, "psychologists");
    let limitItems, allItems;

    if (payload === "A to Z") {
        limitItems = query(
            psychologistsRef,
            orderByChild("name"),
            limitToFirst(perPage),
        );

        allItems = query(
            psychologistsRef,
            orderByChild("name"),
        );
    }

    else if (payload === "Z to A") {
        limitItems = query(
            psychologistsRef,
            orderByChild("name"),
            limitToLast(perPage),
        );

        allItems = query(
            psychologistsRef,
            orderByChild("name"),
        );
    }

    else if (payload === "Less than 10$") {
        limitItems = query(
            psychologistsRef,
            orderByChild("price_per_hour"),
            limitToFirst(perPage),
        );

        allItems = query(
            psychologistsRef,
            orderByChild("price_per_hour"),
        );
    }

    else if (payload === "Greater than 10$") {
        limitItems = query(
            psychologistsRef,
            orderByChild("price_per_hour"),
            limitToLast(perPage),
        );

        allItems = query(
            psychologistsRef,
            orderByChild("price_per_hour"),
        );
    }

    else if (payload === "Popular") {
        limitItems = query(
            psychologistsRef,
            orderByChild("rating"),
            limitToLast(perPage),
        );

        allItems = query(
            psychologistsRef,
            orderByChild("rating"),
        );
    }

    else if (payload === "Not popular") {
        limitItems = query(
            psychologistsRef,
            orderByChild("rating"),
            limitToFirst(perPage),
        );

        allItems = query(
            psychologistsRef,
            orderByChild("rating"),
        );
    }

    else {
        limitItems = query(
            psychologistsRef,
            limitToFirst(perPage),
        );
        allItems = query(
            psychologistsRef,
        );
    }

    return {
        limitItems,
        allItems,
    }

}

