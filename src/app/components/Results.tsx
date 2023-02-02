import { FaBriefcase, FaCompass, FaUser, FaUserFriends, FaUsers } from "react-icons/fa"
import { User } from "../types"
import { Tooltip } from "./Tooltip"
import { BattleReducerActions, BattleReducerState } from "../types"
import queryString from "query-string"
import { useEffect, useReducer } from "react"
import api from "../api/index";
import { Loading } from "./Loading"
import { Card } from "./Card"
import { Link } from "react-router-dom"

type ProfileType = {
    profile: User & { score: number }
}

const ProfileList = ({ profile }: ProfileType) => {
    return (
        <ul className="card-list">
            <li>
                <FaUser color='rgb(239, 115, 115)' size={22} />
                {profile.name}
            </li>
            {
                profile.location && (
                    <li>
                        <Tooltip text="User's location">
                            <FaCompass color='rgb(144, 115, 255)' size={22} />
                            {profile.location}
                        </Tooltip>
                    </li>
                )
            }

            {
                profile.company && (
                    <li>
                        <Tooltip text="User's company">
                            <FaBriefcase color='#795548' size={22} />
                            {profile.company}
                        </Tooltip>
                    </li>
                )
            }
            <li>
                <FaUsers color="rgb(129, 195, 245)" size={22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color="rgb(64, 183, 95)" size={22} />
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    )
}

function battleReducer(state: BattleReducerState, actions: BattleReducerActions): BattleReducerState {
    if (actions.type === 'success') {
        return {
            winner: actions.winner,
            loser: actions.loser,
            error: null,
            loading: false
        }
    } else if (actions.type === 'error') {
        return {
            ...state,
            error: actions.message,
            loading: false
        }
    } else {
        throw new Error(`action not allowed`)
    }
}

export const Results = () => {
    const { playerOne, playerTwo } = queryString.parse(window.location.search);

    const [state, dispatch] = useReducer(battleReducer, {
        winner: null,
        loser: null,
        error: null,
        loading: true
    })

    useEffect(() => {
        api.battle([playerOne as string, playerTwo as string])
            .then((players) => dispatch({
                type: 'success',
                winner: players[0],
                loser: players[1]
            }))
            .catch(e => dispatch({ type: 'error', message: e.message }))
    }, [playerOne, playerTwo])

    const { winner, loser, error, loading } = state

    if (loading === true) {
        return <Loading text='Battling' />
    }
    if (error) {
        return (
            <p className='center-text error'>{error}</p>
        )
    }

    return (
        <>
            <div className="grid space-around container-sm">
                <Card
                    header={winner!.score === loser!.score ? 'Tie' : 'Winner'}
                    subheader={`Score ${winner?.score.toLocaleString()}`}
                    avatar={winner!.avatar_url}
                    href={winner!.html_url}
                    name={winner!.login}
                >
                    <ProfileList profile={winner!} />
                </Card>
                <Card
                    header={winner!.score === loser!.score ? 'Tie' : 'Loser'}
                    subheader={`Score ${loser?.score.toLocaleString()}`}
                    avatar={loser!.avatar_url}
                    href={loser!.html_url}
                    name={loser!.login}
                >
                    <ProfileList profile={loser!} />
                </Card>
            </div>
            <Link
                to='/battle'
                className='btn dark-btn btn-space'>
                Reset
            </Link>
        </>
    )
}
