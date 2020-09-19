export default class ApiMovies {
    async getResource(url) {
        const res = await fetch(url)
        if(!res.ok) {
            throw new Error(`Could not fetch ${url} received ${res.status}`)
        }
        return res.json()
    }

    async postResource(url, obj){
        const response = await fetch(url, obj);
        const result = await response.json();
        return result
    }
}