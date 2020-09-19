import React, { Component } from 'react';
import { Spin, Alert, Input } from 'antd';
import * as _ from 'lodash';
import ContentApp from './ContentApp/ContentApp';
import './style.css';
import ApiMovies from '../../system/Api';
import TopPanel from '../TopPanel';
import { Provider } from '../MovieContext';

export default class App extends Component {
  state = {
    movies: [],
    moviesRate: [],
    moviesGenres: [],
    topPanel: false,
    isLoaded: true,
    searchInput: '',
    search: '',
    error: false,
    totalPage: null,
    currentPage: 1,
    internet: true,
    userSession: '',
  };

  debounceSearchMovies = _.debounce(this.searchMovies.bind(this), 700);

  apiKey = '356f4b0d2eb12b4eb2d7631c1eb1594d';

  componentDidMount() {
    this.onInternetAddEvent();
    const newState = new ApiMovies();
    newState
      .getResource(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`)
      .then((res) => {
        this.setState({ userSession: res.guest_session_id });
      })
      .catch(this.errorAlert.bind(this));
    newState
      .getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`)
      .then((res) => {
        this.setState({ moviesGenres: res.genres });
      })
      .catch(this.errorAlert.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, currentPage } = this.state;
    if (
      (search !== prevState.search && search !== '') ||
      (currentPage !== prevState.currentPage && currentPage !== 1)
    ) {
      const newState = new ApiMovies();

      newState
        .getResource(
          `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=ru-RU&page=${currentPage}&include_adult=false&query=${search}`
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

  onTopPanel = (top) => {
    const { topPanel } = this.state;
    if (!topPanel) {
      this.setState({ topPanel: top });
      this.getMoviesRate();
    } else {
      this.setState({ topPanel: top });
      this.getMoviesRate();
    }
  };

  onInternetAddEvent() {
    window.addEventListener('offline', this.onInternet.bind(this));
    window.addEventListener('online', this.onInternet.bind(this));
  }

  onInternet() {
    const { internet } = this.state;
    this.setState({ internet: !internet });
  }

  getMoviesRate = () => {
    const { userSession } = this.state;
    const getMoviesRate = new ApiMovies();
    getMoviesRate
      .getResource(
        `https://api.themoviedb.org/3/guest_session/${userSession}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
      )
      .then((res) => {
        this.setState({ moviesRate: res.results, isLoaded: false, error: false });
      })
      .catch(this.errorAlert.bind(this));
  };

  searchMoviesInput = (searchInput) => {
    this.setState({ searchInput });
    this.debounceSearchMovies(searchInput);
  };

  onPushRate = (id, rate) => {
    const newRate = new ApiMovies();
    const { userSession } = this.state;
    const newRateValue = { value: rate };
    newRate
      .postResource(
        `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${userSession}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(newRateValue),
        }
      )
      .catch(this.errorAlert.bind(this));
  };

  searchMovies(newSearch) {
    const { search } = this.state;
    if (newSearch === search) this.setState({ search: newSearch, searchInput: '' });
    else this.setState({ isLoaded: true, search: newSearch, searchInput: '' });
  }

  errorAlert() {
    this.setState({ search: '', isLoaded: false, error: true });
  }

  render() {
    const {
      movies,
      moviesRate,
      isLoaded,
      search,
      searchInput,
      error,
      currentPage,
      totalPage,
      internet,
      topPanel,
      moviesGenres,
    } = this.state;
    const finalMovies = !topPanel ? movies : moviesRate;
    if (!internet) {
      return (
        <Alert message="У вас отсутсвует интернет" description="Попробуйте повторить позже" type="error" showIcon />
      );
    }
    if (search === '' && !topPanel) {
      return (
        <div className="container">
          <TopPanel topPanel={topPanel} onTopPanel={this.onTopPanel} />
          <Input
            autoFocus
            placeholder="Начните поиск"
            size="large"
            value={searchInput}
            onChange={(event) => {
              this.searchMoviesInput(event.target.value);
            }}
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
      <Provider value={moviesGenres}>
        <ContentApp
          search={search}
          searchInput={searchInput}
          searchMoviesInput={this.searchMoviesInput}
          searchMovies={this.searchMovies}
          movies={finalMovies}
          currentPage={currentPage}
          totalPage={totalPage}
          onPagination={this.onPagination}
          onPushRate={this.onPushRate}
          topPanel={topPanel}
          onTopPanel={this.onTopPanel}
        />
      </Provider>
    ) : (
      <Alert message="Упс..." description="Попробуйте повторить позже" type="error" showIcon />
    );
  }
}
