import React, { Component } from 'react';
import { Spin, Input } from 'antd';
import MoviesList from '../MoviesList';
import './style.css';
import ApiMovies from '../../api';

const { Search } = Input;
export default class App extends Component {
  static apiKey = '356f4b0d2eb12b4eb2d7631c1eb1594d';

  state = {
    movies: [],
    isLoaded: false,
    search: 'Search',
  };

  componentDidMount() {
    const { search } = this.state;
    const newState = new ApiMovies();
    newState
      .getResource(
        `https://api.themoviedb.org/3/search/movie?api_key=356f4b0d2eb12b4eb2d7631c1eb1594d&language=ru-RU&page=1&include_adult=false&query=${search}`
      )
      .then((res) => {
        this.setState({ movies: res.results, isLoaded: true });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    if (search !== prevState.search && search !== '') {
      const newState = new ApiMovies();
      newState
        .getResource(
          `https://api.themoviedb.org/3/search/movie?api_key=356f4b0d2eb12b4eb2d7631c1eb1594d&language=ru-RU&page=1&include_adult=false&query=${search}`
        )
        .then((res) => {
          this.setState({ movies: res.results, isLoaded: true });
        });
    }
  }

  searchMovies(search) {
    console.log(this.state.movies);
    this.setState({ search });
  }

  render() {
    const { movies, isLoaded, search } = this.state;
    if (!isLoaded) {
      return (
        <div className="example">
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div className="container">
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          value={search}
          onChange={(event) => this.searchMovies(event.target.value)}
        />
        <MoviesList movies={movies} />
      </div>
    );
  }
}
