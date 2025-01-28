export const sortPsychologists = (data, payload) => {
    return data.sort((a, b) => {
        if (payload === "A to Z") return a.name.localeCompare(b.name);
        if (payload === "Z to A") return b.name.localeCompare(a.name);
        if (payload === "Less than 10$") return a.price_per_hour - b.price_per_hour;
        if (payload === "Greater than 10$") return b.price_per_hour - a.price_per_hour;
        if (payload === "Popular") return b.rating - a.rating;
        if (payload === "Not popular") return a.rating - b.rating;
        return 0;
    });
};

export const sort = (data, sortName, sortOrder) => {
    return data.sort((a, b) => {
        if (sortName === "name" && sortOrder === "asc")
            return a.name.localeCompare(b.name);
        if (sortName === "name" && sortOrder === "desc")
            return b.name.localeCompare(a.name);
        if (sortName === "price_per_hour" && sortOrder === "asc")
            return a.price_per_hour - b.price_per_hour;
        if (sortName === "price_per_hour" && sortOrder === "desc")
            return b.price_per_hour - a.price_per_hour;
        if (sortName === "rating" && sortOrder === "asc")
            return a.rating - b.rating;
        if (sortName === "rating" && sortOrder === "desc")
            return b.rating - a.rating;
        return 0;
    });
};