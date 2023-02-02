export type theme = "dark" | "light";
export type Languages = "All" | "Javascript" | "CSS" | "Ruby" | "Java" | "Python";

type LanguageReposState =
    | {
        lang: Languages | null,
        repos: Repo[] | null
    }
    & {
        error: string | null
    }

type LanguageRepoActions = {
    type: 'success',
    lang: Languages,
    repos: Repo[]
} | {
    type: 'error',
    error: string | null
} | {
    type: 'clear'
}

export function LanguageRepoReducer(state: LanguageReposState, actions: LanguageRepoActions): LanguageReposState {
    switch (actions.type) {
        case 'success': {
            return {
                lang: actions.lang,
                repos: actions.repos,
                error: null
            }
        }
        case 'error': {
            return {
                ...state,
                repos: [],
                error: actions.error
            }
        }
        case 'clear': {
            return {
                lang: null,
                repos: null,
                error: null,
            }
        }
        default: {
            return state
        }
    }
}

export type Repo = {
    name: string,
    owner: User,
    html_url: string,
    stargazers_count: number,
    forks: number,
    open_issues: number
}

export type User = {
    login: string,
    avatar_url: string
    name: string
    html_url: string
    location?: string
    company?: string
    followers: number
    following: number
}

export type BattleReducerState = {
    winner: null | User & { score: number }
    loser: null | User & { score: number }
    error: null | string
    loading: boolean
}


export type BattleReducerActions =
    | {
        type: "success"
        winner: User & { score: number }
        loser: User & { score: number }
    }
    | {
        type: "error"
        message: string
    }
