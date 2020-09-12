import React from 'react';
import PropTypes from 'prop-types';
import { Input, Pagination } from 'antd';
import MoviesList from '../../MoviesList';

const { Search } = Input;
const ContentApp = ({ searchInput, searchMovies, searchMoviesInput, movies, currentPage, onPagination, totalPage }) => (
  <div className="container">
    <Search
      placeholder="Начните поиск"
      size="large"
      value={searchInput}
      onChange={(event) => searchMoviesInput(event.target.value)}
      onPressEnter={(event) => searchMovies(event.target.value)}
    />
    <MoviesList movies={movies} />
    <Pagination
      pageSize={20}
      current={currentPage}
      onChange={onPagination}
      total={movies.length * totalPage}
      showSizeChanger={false}
    />
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
