import React, { Component } from 'react';
import { Spin, Alert } from 'antd';
import ContentApp from './ContentApp';
import './style.css';
import ApiMovies from '../../api';

export default class App extends Component {
  state = {
    movies: [],
    isLoaded: true,
    searchInput: '',
    search: 'return',
    error: false,
  };

  componentDidMount() {
    const { search } = this.state;
    const newState = new ApiMovies();
    newState
      .getResource(
        `https://api.themoviedb.org/3/search/movie?api_key=356f4b0d2eb12b4eb2d7631c1eb1594d&language=ru-RU&page=1&include_adult=false&query=${search}`
      )
      .then((res) => {
        this.setState({ movies: res.results, isLoaded: false, error: false });
      })
      .catch(this.errorAlert.bind(this));
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
          this.setState(() => {
            return {
              movies: res.results,
              isLoaded: false,
              error: false,
            };
          });
        })
        .catch(this.errorAlert);
    }
  }

  searchMovies = (newSearch) => {
    const { search } = this.state;
    if (newSearch === search) this.setState({ search: newSearch, searchInput: '' });
    else this.setState({ isLoaded: true, search: newSearch, searchInput: '' });
  };

  searchMoviesInput = (searchInput) => {
    this.setState({ searchInput });
  };

  errorAlert() {
    this.setState({ isLoaded: false, error: true });
  }

  render() {
    const { movies, isLoaded, search, searchInput, error } = this.state;
    if (isLoaded) {
      return (
        <div className="example">
          <Spin size="large" />
        </div>
      );
    }
    return !error ? (
      <ContentApp
        search={search}
        searchInput={searchInput}
        searchMoviesInput={this.searchMoviesInput}
        searchMovies={this.searchMovies}
        movies={movies}
      />
    ) : (
      <Alert message="Упс..." description="Попробуйте повторить позже" type="error" showIcon />
    );
  }
}
