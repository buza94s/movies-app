import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import MoviesList from '../MoviesList';

const { Search } = Input;
const ContentApp = ({ searchInput, searchMovies, searchMoviesInput, movies }) => (
  <div className="container">
    <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      value={searchInput}
      onChange={(event) => searchMoviesInput(event.target.value)}
      onPressEnter={(event) => searchMovies(event.target.value)}
    />
    <MoviesList movies={movies} />
  </div>
);
ContentApp.defaultdefaultProps = {
  searchInput: '',
  searchMovies: () => {},
  searchMoviesInput: () => {},
  movies: [],
};
ContentApp.propTypes = {
  searchInput: PropTypes.string.isRequired,
  searchMovies: PropTypes.func.isRequired,
  searchMoviesInput: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf.isRequired,
};
export default ContentApp;
