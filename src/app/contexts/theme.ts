import { createContext } from "react";
import { theme } from "../types";

const ThemeContext = createContext<theme>(undefined!);

export default ThemeContext
export const ThemeConsumer = ThemeContext.Consumer
export const ThemeProvider = ThemeContext.Provider
