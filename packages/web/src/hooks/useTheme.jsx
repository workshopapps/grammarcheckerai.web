import { useContext } from "react"
import { ThemeContext } from "../lib/context/DarkThemeContext"

const useTheme = () => {
    return useContext(ThemeContext);
}

export default useTheme