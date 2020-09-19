import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert } from 'antd';
import Movie from '../Movie';
import { Consumer } from '../MovieContext';
import './style.css';

export default class App extends Component {
  state = {};

  static defaultProps = {
    movies: [],
    onPushRate: () => {},
    topPanel: false,
  };

  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object),
    onPushRate: PropTypes.func,
    topPanel: PropTypes.bool,
  };

  render() {
    const { movies, onPushRate, topPanel } = this.props;
    const alertMessage = !topPanel ? 'Результатов нет' : 'У вас нет избранных фильмов';

    const alertDescription = !topPanel
      ? 'К сожалению, по данному запросу результатов нет. Попробуйте найти что-нибудь другое.'
      : 'Добавьте что-нибудь в избранное';
    const listMovie = movies.map((movie) => {
      const {
        id,
        title,
        overview,
        poster_path: posterParh,
        release_date: releaseDate,
        rating,
        vote_average: voteAverage,
        genre_ids: genreIds,
      } = movie;
      return (
        <Col xs={{ span: 18 }} sm={{ span: 10 }} key={id} style={{ marginTop: 16 }}>
          <Consumer>
            {(moviesGenres) => {
              return (
                <Movie
                  id={id}
                  title={title}
                  overview={overview}
                  posterParh={posterParh}
                  releaseDate={releaseDate}
                  onPushRate={onPushRate}
                  rating={rating}
                  voteAverage={voteAverage}
                  moviesGenres={moviesGenres}
                  genreIds={genreIds}
                />
              );
            }}
          </Consumer>
        </Col>
      );
    });
    return (
      <div className="movies-list">
        {movies.length > 0 ? (
          listMovie
        ) : (
          <Alert message={alertMessage} description={alertDescription} type="info" showIcon />
        )}
      </div>
    );
  }
}
