export default class ApiMovies {
    apiBase = ''

    async getResource(url) {
        const res = await fetch(`${this.apiBase}${url}`)
        if(!res.ok) {
            throw new Error(`Could not fetch ${url} received ${res.status}`)
        }
        return res.json()
    }
}