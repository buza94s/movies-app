import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import 'antd/dist/antd.css';
import './style.css';
import { Card, Image, Typography } from 'antd';
import { custDescription, getColorRate } from '../../system/HelperFunction';
import noimg from './noimg.jpg';
import RateCust from './RateCust';

const { Title, Text } = Typography;
export default class Movie extends Component {
  state = {};

  static defaultProps = {
    id: 0,
    title: '',
    overview: '',
    posterParh: '',
    releaseDate: new Date(),
    rating: 0,
    voteAverage: 0,
    moviesGenres: [],
    genreIds: [],
    onPushRate: () => {},
  };

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    overview: PropTypes.string,
    posterParh: PropTypes.string,
    releaseDate: PropTypes.instanceOf(),
    rating: PropTypes.number,
    voteAverage: PropTypes.number,
    moviesGenres: PropTypes.arrayOf,
    genreIds: PropTypes.arrayOf,
    onPushRate: PropTypes.func,
  };

  render() {
    const {
      id,
      title,
      overview,
      posterParh,
      releaseDate,
      onPushRate,
      rating,
      voteAverage,
      moviesGenres,
      genreIds,
    } = this.props;
    const description = custDescription(overview);
    const colorRate = getColorRate(voteAverage);
    const genres = moviesGenres.filter((item) => genreIds.includes(item.id));
    const genersContent = genres.map((item) => {
      return (
        <Text code key={item.id}>
          {item.name}
        </Text>
      );
    });
    return (
      <div className="movie">
        <Card size="small" hoverable>
          <Image height={270} src={posterParh ? `http://image.tmdb.org/t/p/w440_and_h660_face/${posterParh}` : noimg} />
          <div className="text-content">
            <Title level={4}>{title}</Title>
            <div>
              <Text type="secondary">
                {releaseDate ? format(new Date(releaseDate), 'MM/dd/yyyy') : 'Дата не определена'}
              </Text>
            </div>
            <div>{genersContent}</div>
            <div>{description}</div>
            <RateCust onPushRate={onPushRate} id={id} rating={rating} />
          </div>
          <div className="rate" style={colorRate}>
            {voteAverage}
          </div>
        </Card>
      </div>
    );
  }
}
