import clsx from "clsx";

export const buildSectionClass = (className, sectionName, css) => {
    return clsx(css[className], {
        [css[`${className}AppBar`]]: sectionName === "AppBar",
        [css[`${className}NavModal`]]: sectionName === "NavigationModal",
    });
};