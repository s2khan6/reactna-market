import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark((p) => !p);

  const theme = dark
    ? {
        bg: "#111827",
        card: "#1f2937",
        text: "#f9fafb",
        accent: "#3b82f6",
      }
    : {
        bg: "#f3f4f6",
        card: "#ffffff",
        text: "#111827",
        accent: "#3b82f6",
      };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
