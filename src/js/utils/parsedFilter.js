export const parsedFilter = (filter) => {
    switch (filter) {
        case "A to Z":
            return "A to Z";
        case "Z to A":
            return "Z to A";
        case "Less than 10$":
            return "Less than 10$";
        case "Greater than 10$":
            return "Greater than 10$";
        case "Popular":
            return "Popular";
        case "Not popular":
            return "Not popular";
        default:
            return "Show all";
    }
};