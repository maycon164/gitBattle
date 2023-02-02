import { useState } from "react"
import { ThemeProvider } from "./contexts/theme"
import { Nav } from "./components/Nav"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import { theme } from "./types"
import { Popular } from "./components/Popular"
import { Battle } from "./components/Battle"

export const App = () => {
    const [theme, setTheme] = useState<theme>("light");
    const toggleTheme = () => setTheme((theme) => theme === 'light' ? 'dark' : 'light');

    return (
        <>
            <Router>
                <ThemeProvider value={theme}>
                    <div className={theme}>
                        <div className="container">
                            <Nav toggleTheme={toggleTheme} />
                            <Routes>
                                <Route path="/" element={<Popular />} />
                                <Route path="battle" element={<Battle />} />
                                <Route path="*" element={<h1>404 not found!!!</h1>} />
                            </Routes>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        </>
    )
}
