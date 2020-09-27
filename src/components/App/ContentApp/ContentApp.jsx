import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Input, Pagination } from 'antd';
import MoviesList from '../../MoviesList';
import TopPanel from '../../TopPanel';

const ContentApp = ({
  searchInput,
  searchMovies,
  searchMoviesInput,
  movies,
  currentPage,
  onPagination,
  totalPage,
  onPushRate,
  topPanel,
  onTopPanel,
  loading,
}) => (
  <div className="container">
    <TopPanel topPanel={topPanel} onTopPanel={onTopPanel} />
    {!topPanel ? (
      <Input
        autoFocus
        placeholder="Начните поиск"
        size="large"
        value={searchInput}
        onChange={(event) => searchMoviesInput(event.target.value)}
        onPressEnter={(event) => searchMovies(event.target.value)}
      />
    ) : null}

    {loading ? (
      <div className="example">
        <Spin size="large" />
      </div>
    ) : (
      <MoviesList movies={movies} onPushRate={onPushRate} topPanel={topPanel} />
    )}

    {!topPanel ? (
      <Pagination
        pageSize={20}
        current={currentPage}
        onChange={onPagination}
        total={movies.length * totalPage}
        showSizeChanger={false}
      />
    ) : null}
  </div>
);
ContentApp.defaultdefaultProps = {
  searchInput: '',
  topPanel: false,
  loading: true,
  searchMovies: () => {},
  searchMoviesInput: () => {},
  movies: [],
  currentPage: 1,
  totalPage: 1,
  onPagination: () => {},
  onPushRate: () => {},
  onTopPanel: () => {},
};
ContentApp.propTypes = {
  searchInput: PropTypes.string.isRequired,
  topPanel: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  searchMovies: PropTypes.func.isRequired,
  searchMoviesInput: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  onPagination: PropTypes.func.isRequired,
  onPushRate: PropTypes.func.isRequired,
  onTopPanel: PropTypes.func.isRequired,
};
export default ContentApp;
