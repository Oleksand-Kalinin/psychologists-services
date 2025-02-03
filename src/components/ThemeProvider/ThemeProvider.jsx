import { createContext, useState, useEffect, useContext } from "react";
import { themes } from "../../js/constans/themes.js";
import { applyTheme } from "../../js/utils/applyTheme.js";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
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
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
export { useTheme };
