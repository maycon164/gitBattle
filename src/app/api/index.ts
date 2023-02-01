import { Repo } from "../types";

export class Api {

    async fetchPopularRepos(lang: string) {
        try {
            const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`)
            const repos = await fetch(endpoint).then(res => res.json()).then(data => data.items)
            return repos as Repo[]
        } catch (err: any) {
            throw new Error('could not load repos: ' + err.message);
        }
    }

}

const apiInstance = new Api();
export default apiInstance