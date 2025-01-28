export const sortPsychologists = (data, payload) => {
    return data.sort((a, b) => {
        if (payload === "A to Z") {
            const nameComparison = a.name.localeCompare(b.name);
            return nameComparison !== 0 ? nameComparison : a.id.localeCompare(b.id);
        }
        if (payload === "Z to A") {
            const nameComparison = b.name.localeCompare(a.name);
            return nameComparison !== 0 ? nameComparison : b.id.localeCompare(a.id);
        }
        if (payload === "Less than 10$") {
            const priceComparison = a.price_per_hour - b.price_per_hour;
            return priceComparison !== 0 ? priceComparison : a.id.localeCompare(b.id);
        }
        if (payload === "Greater than 10$") {
            const priceComparison = b.price_per_hour - a.price_per_hour;
            return priceComparison !== 0 ? priceComparison : b.id.localeCompare(a.id);
        }
        if (payload === "Popular") {
            const ratingComparison = b.rating - a.rating;
            return ratingComparison !== 0 ? ratingComparison : b.id.localeCompare(a.id);
        }
        if (payload === "Not popular") {
            const ratingComparison = a.rating - b.rating;
            return ratingComparison !== 0 ? ratingComparison : a.id.localeCompare(b.id);
        }
        return 0;
    });
};

// export const sortTest = (data, sortName, sortOrder) => {
//     return data.sort((a, b) => {
//         if (sortName === "name" && sortOrder === "asc")
//             return a.name.localeCompare(b.name);
//         if (sortName === "name" && sortOrder === "desc")
//             return b.name.localeCompare(a.name);
//         if (sortName === "price_per_hour" && sortOrder === "asc")
//             return a.price_per_hour - b.price_per_hour;
//         if (sortName === "price_per_hour" && sortOrder === "desc")
//             return b.price_per_hour - a.price_per_hour;
//         if (sortName === "rating" && sortOrder === "asc")
//             return a.rating - b.rating;
//         if (sortName === "rating" && sortOrder === "desc")
//             return b.rating - a.rating;
//         return 0;
//     });
// };