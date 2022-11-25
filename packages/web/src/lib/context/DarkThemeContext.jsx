import { useEffect } from "react";
import { createContext, useState } from "react";

export const ThemeContext = createContext({
    theme: 'light',
    toggle: ()=>{},
});

const DarkThemeContext = ({ children }) => {
    const prevTheme = localStorage.getItem('theme');

    const [theme, setTheme] = useState(prevTheme);
    useEffect(() => {
        setTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            localStorage.setItem('theme', theme);
        } else {
            setTheme('light');
            localStorage.setItem('theme', theme);
        }
    }

    const value = {
        theme: theme,
        toggle: toggleTheme
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export default DarkThemeContext;