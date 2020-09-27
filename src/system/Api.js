export default class ApiMovies {
  apiKey = '356f4b0d2eb12b4eb2d7631c1eb1594d';

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} received ${res.status}`);
    }
    return res.json();
  }

  async postResource(url, obj) {
    const response = await fetch(url, obj);
    const result = await response.json();
    return result;
  }

  async getGuestSession() {
    return this.getResource(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`);
  }

  async getGenre() {
    return this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`);
  }

  async getMovies(currentPage, search) {
    return this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=ru-RU&page=${currentPage}&include_adult=false&query=${search}`
    );
  }

  async getMoviesRate(userSession) {
    return this.getResource(
      `https://api.themoviedb.org/3/guest_session/${userSession}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    );
  }
}
