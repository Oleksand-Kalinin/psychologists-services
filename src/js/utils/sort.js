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