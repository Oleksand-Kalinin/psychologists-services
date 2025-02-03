import { createContext, useState, useEffect, useContext } from "react";
import { themes } from "./js/constans/themes.js";
import { applyTheme } from "./js/utils/applyTheme.js";

const themeContext = createContext();
export const useTheme = () => useContext(themeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("green");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "green";
    setTheme(savedTheme);
    const selectedTheme = themes[savedTheme];
    applyTheme(selectedTheme);
  }, []);

  const changeTheme = (color) => {
    setTheme(color);
    localStorage.setItem("theme", color);

    // Застосовуємо всі CSS змінні для обраної теми
    const selectedTheme = themes[color];
    applyTheme(selectedTheme);
  };

  return (
    <themeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </themeContext.Provider>
  );
};
