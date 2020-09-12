import React, { Component } from 'react';
import { Spin, Alert, Input } from 'antd';
import * as _ from 'lodash';
import ContentApp from './ContentApp';
import './style.css';
import ApiMovies from '../../api';

const { Search } = Input;
export default class App extends Component {
  state = {
    movies: [],
    isLoaded: true,
    searchInput: '',
    search: '',
    error: false,
    totalPage: null,
    currentPage: 1,
    internet: true,
  };

  componentDidMount() {
    this.onInternetAddEvent();
    const { search, currentPage } = this.state;
    if (search !== '') {
      const newState = new ApiMovies();
      newState
        .getResource(
          `https://api.themoviedb.org/3/search/movie?api_key=356f4b0d2eb12b4eb2d7631c1eb1594d&language=ru-RU&page=${currentPage}&include_adult=false&query=${search}`
        )
        .then((res) => {
          this.setState({ movies: res.results, isLoaded: false, error: false, totalPage: res.total_pages });
        })
        .catch(this.errorAlert.bind(this));
    }
  }

  componentDidUpdate(prevState) {
    const { search, currentPage } = this.state;
    if (
      (search !== prevState.search && search !== '') ||
      (currentPage !== prevState.currentPage && currentPage !== 1)
    ) {
      const newState = new ApiMovies();

      newState
        .getResource(
          `https://api.themoviedb.org/3/search/movie?api_key=356f4b0d2eb12b4eb2d7631c1eb1594d&language=ru-RU&page=${currentPage}&include_adult=false&query=${search}`
        )
        .then((res) => {
          this.setState(() => {
            return {
              movies: res.results,
              isLoaded: false,
              error: false,
              totalPage: res.total_pages,
            };
          });
        })
        .catch(this.errorAlert.bind(this));
    }
  }

  onPagination = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  onInternetAddEvent() {
    window.addEventListener('offline', this.onInternet.bind(this));
    window.addEventListener('online', this.onInternet.bind(this));
  }

  onInternet() {
    const { internet } = this.state;
    this.setState({ internet: !internet });
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
    this.setState({ search: '', isLoaded: false, error: true });
  }

  render() {
    const { movies, isLoaded, search, searchInput, error, currentPage, totalPage, internet } = this.state;
    if (!internet) {
      return (
        <Alert message="У вас отсутсвует интернет" description="Попробуйте повторить позже" type="error" showIcon />
      );
    }
    if (search === '') {
      return (
        <div>
          <Search
            placeholder="Начните поиск"
            size="large"
            value={searchInput}
            onChange={(event) => this.searchMoviesInput(event.target.value)}
            onPressEnter={(event) => this.searchMovies(event.target.value)}
          />
          <Alert
            message="Начните поиск фильма"
            description="Введите название фильма в поисковую строку"
            type="info"
            showIcon
          />
        </div>
      );
    }
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
        currentPage={currentPage}
        totalPage={totalPage}
        onPagination={this.onPagination}
      />
    ) : (
      <Alert message="Упс..." description="Попробуйте повторить позже" type="error" showIcon />
    );
  }
}
