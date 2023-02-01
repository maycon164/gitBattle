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
    owner: {
        login: string,
        avatar_url: string
    },
    html_url: string,
    stargazers_count: number,
    forks: number,
    open_issues: number
}