import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert } from 'antd';
import Movie from '../Movie';
import './style.css';

export default class App extends Component {
  static = {};

  static defaultProps = {
    movies: [],
  };

  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { movies } = this.props;
    const listMovie = movies.map((movie) => {
      const { id, title, overview, poster_path, release_date } = movie;
      return (
        <Col xs={{ span: 18 }} sm={{ span: 10 }} key={id} style={{ marginTop: 16 }}>
          <Movie title={title} overview={overview} poster_path={poster_path} release_date={release_date} />
        </Col>
      );
    });
    return (
      <div className="movies-list">
        {movies.length > 0 ? (
          listMovie
        ) : (
          <Alert
            message="Результатов нет"
            description="К сожалению, по данному запросу результатов нет. Попробуйте найти что-нибудь другое."
            type="info"
            showIcon
          />
        )}
      </div>
    );
  }
}
