import { Repo, User } from "../types";

const id = "YOUR_CLIENT_ID"
const sec = "YOUR_SECRET_ID"
const params = `?client_id=${id}&client_secret=${sec}`
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

    async battle(players: string[]) {
        const results = await Promise.all([
            await this.getUserData(players[0]),
            await this.getUserData(players[1])
        ]).then((data) => this.sortPlayers(data));

        return results;
    }

    async getUserData(player: string): Promise<User & { score: number }> {
        const result = await Promise.all([
            this.getProfile(player),
            this.getRepos(player)
        ]).then(([profile, repos]) => {
            profile
            score: this.calculateScore(profile.followers, repos)
        }) as User & { score: number }

        return result
    }

    calculateScore(followers: number, repos: Repo[]) {
        return (followers * 3) + this.getStartCount(repos)
    }

    async getRepos(username: string): Promise<Repo[]> {
        try {
            const repos = await
                fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
                    .then(response => response.json())
            return repos as Repo[]
        } catch (e: any) {
            throw new Error(`${e.message}, ${username}`)
        }

    }

    async getProfile(username: string): Promise<User> {
        try {

            const profile = await
                fetch(`https://api.github.com/users/${username}${params}`)
                    .then(response => response.json())
            return profile as User;

        } catch (e: any) {
            throw new Error(`${e.message}, ${username}`)
        }
    }

    getStartCount(repos: Repo[]) {
        return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
    }

    async sortPlayers(players: (User & { score: number })[]) {
        return players.sort((a, b) => b.score - a.score);
    }

}

const apiInstance = new Api();
export default apiInstance