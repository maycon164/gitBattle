import { NavLink } from "react-router-dom"
import { PropsWithChildren, useContext } from "react"
import ThemeContext from "../contexts/theme"
import { activeStyle } from "../constants"

export const Nav = ({ toggleTheme }: PropsWithChildren<{ toggleTheme: () => void }>) => {

    const theme = useContext(ThemeContext);

    return (
        <nav className="row space-between">
            <ul className="row nav">
                <li>
                    <NavLink
                        to='/'
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                        className='nav-link'>
                        Popular
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='battle'
                        className='nav-link'
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Battle
                    </NavLink>
                </li>
            </ul>
            <button
                style={{ fontSize: 30 }}
                className='btn-clear'
                onClick={toggleTheme}
            >
                {theme === 'light' ? '🔦' : '💡'}
            </button>
        </nav>
    )
}
