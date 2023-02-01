import { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { FaCodeBranch, FaExclamationTriangle, FaStar, FaUser } from 'react-icons/fa'
import api from "../api/index";
import { activeStyle } from "../constants";
import { LanguageRepoReducer, Languages, Repo } from "../types";
import { Loading } from "./Loading";
import { Card } from "./Card";
import { Tooltip } from "./Tooltip";

type LangaugesNavType = {
    selected: string,
    onUpdateLangauge: Dispatch<SetStateAction<Languages>>
}

const LangaugesNav = ({ selected, onUpdateLangauge }: LangaugesNavType) => {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className="flex-center">
            {
                languages.map((language) => {
                    return (
                        <li key={language}>
                            <button
                                className="btn-clear nav-link"
                                style={language === selected ? activeStyle : undefined}
                                onClick={() => onUpdateLangauge(language as Languages)}
                            >
                                {language}
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

const ReposGrid = ({ repos, lang }: { repos: Repo[], lang: Languages }) => {
    return (
        <>
            <h1>{lang}</h1>
            <ul className="grid space around">
                {
                    repos.map((repo, index) => {
                        const { html_url, owner, stargazers_count, forks, open_issues } = repo;
                        const { avatar_url, login } = owner
                        return (
                            <li key={html_url}>
                                <Card
                                    header={`#${index + 1}`}
                                    avatar={avatar_url}
                                    href={html_url}
                                    name={login}
                                >
                                    <ul className="card-list">
                                        <li>
                                            <Tooltip text="Github username">
                                                <FaUser color="rgb(255, 191, 116)" />
                                                <a href={`https://github.com/${login}`}>
                                                    {login}
                                                </a>
                                            </Tooltip>
                                        </li>
                                        <li>
                                            <FaStar color="rgb(255,215,0)" size={22} />
                                            {stargazers_count.toLocaleString()} stars
                                        </li>
                                        <li>
                                            <FaCodeBranch color="rgb(129, 195, 245)" />
                                            {forks.toLocaleString()} forks
                                        </li>
                                        <li>
                                            <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                                            {open_issues.toLocaleString()} open
                                        </li>
                                    </ul>
                                </Card>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export const Popular = () => {

    const [language, setLanguage] = useState<Languages>("All")

    const [state, dispatch] = useReducer(LanguageRepoReducer, {
        lang: 'All',
        repos: [],
        error: null
    })

    useEffect(() => {

        dispatch({ type: 'clear' });

        api.fetchPopularRepos(language).then(repos => {
            dispatch({ type: 'success', lang: language, repos })
        }).catch(err => {
            dispatch({ type: 'error', error: err.message })
        })

    }, [language])

    const isLoading = () => state.repos == null && state.error === null && state.lang == null;

    return (
        <>
            <LangaugesNav selected={language} onUpdateLangauge={setLanguage} />

            {isLoading() && <Loading text="Fetching Repos" />}

            {state.error && <p className="center-text error">${state.error}</p>}

            {state.repos && state.lang && <ReposGrid repos={state.repos} lang={state.lang} />}
        </>
    )
}
