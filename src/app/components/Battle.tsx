import { useContext, useState } from "react"
import { FaFighterJet, FaTimesCircle, FaTrophy, FaUserFriends } from "react-icons/fa"
import { Link } from "react-router-dom"
import ThemeContext from "../contexts/theme"

export const Battle = () => {

    const [playerOne, setPlayerOne] = useState<string | null>(null)
    const [playerTwo, setPlayerTwo] = useState<string | null>(null)

    const handleSubmit = (id: string, player: string) => {
        if (id === 'playerOne') {
            setPlayerOne(player)
        } else {
            setPlayerTwo(player)
        }
    }

    const handleReset = (id: string) => id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null)

    return (
        <>
            <Instructions />

            <div className="players-container">
                <h1 className="center-text header-lg">Players</h1>
                <div className="row space-around">
                    {
                        playerOne === null ? (
                            <PlayerInput
                                label="Player One"
                                onSubmit={(player) => handleSubmit('playerOne', player)}
                            />
                        ) : (
                            <PlayerPreview
                                username={playerOne}
                                label="Player One"
                                onReset={() => handleReset('playerOne')}
                            />
                        )
                    }
                    {
                        playerTwo === null ? (
                            <PlayerInput
                                label="Player Two"
                                onSubmit={(player) => handleSubmit('playerTwo', player)}
                            />
                        ) : (
                            <PlayerPreview
                                username={playerTwo}
                                label="Player Two"
                                onReset={() => handleReset('playerTwo')}
                            />
                        )
                    }
                </div>

                {
                    playerOne && playerTwo && (
                        <Link
                            className="btn dark-btn btn-space"
                            to={{
                                pathname: '/battle/results',
                                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                            }}
                        >
                            Battle
                        </Link>
                    )
                }
            </div>
        </>
    )
}

type PlayerInputType = {
    label: string
    onSubmit: (value: string) => void
}

const PlayerInput = ({ label, onSubmit }: PlayerInputType) => {

    const [username, setUsername] = useState('');
    const theme = useContext(ThemeContext);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(username)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    return (
        <form className="column player" onSubmit={handleSubmit}>
            <label htmlFor="">{label}</label>

            <div className="row player inputs">
                <input
                    type="text"
                    id="username"
                    className={`input-${theme}`}
                    placeholder='github username'
                    autoComplete="off"
                    value={username}
                    onChange={handleChange}
                />
                <button
                    className={`btn ${theme === 'dark'}? 'light-btn' : 'dark-btn'`}
                    type="submit"
                    disabled={!username}
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

type PlayerPreviewType = {
    username: string
    onReset: () => void
    label: string
}

const PlayerPreview = ({ username, onReset, label }: PlayerPreviewType) => {

    const theme = useContext(ThemeContext);

    return (
        <div className="column player">
            <h3 className="player-label ">{label}</h3>
            <div className={`row bg-${theme}`}>
                <div className="player-info">
                    <img className="avatar-small" src={`https://github.com/${username}.png?size=200`} alt={`avatar for ${username}`} />
                    <a href={`https://github.com/${username}`} className="link">
                        {username}
                    </a>
                    <button className="btn-clear flex-center" onClick={onReset}>
                        <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
                    </button>
                </div>
            </div>
        </div>
    )
}

const Instructions = () => {
    const theme = useContext(ThemeContext)

    return (
        <div className="instructions-container">
            <h1 className="center-text header-lg">Instructions</h1>
            <ol className="container-sm grid center-text battel-instructions">
                <li>
                    <h3 className="header-sm">Enter two Github Users</h3>
                    <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
                </li>
                <li>
                    <h3 className="header-sm">Battle</h3>
                    <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
                </li>
                <li>
                    <h3 className="header-sm">See the winners</h3>
                    <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
                </li>
            </ol>
        </div>

    )
}