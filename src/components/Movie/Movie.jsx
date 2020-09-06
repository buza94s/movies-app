import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import 'antd/dist/antd.css';
import './style.css';
import { Card, Image, Typography } from 'antd';
import HelperFunction from '../../api/HelperFunction';

const { Title, Text, Link } = Typography;
const helpers = new HelperFunction();
export default class Movie extends Component {
  state = {};

  static defaultProps = {
    title: '',
    release_date: new Date(),
  };

  static propTypes = {
    title: PropTypes.string,
    release_date: PropTypes.instanceOf(),
  };

  render() {
    const { title, overview, poster_path, release_date } = this.props;
    const description = helpers.Cutdescription(overview);
    return (
      <div className="movie">
        <Card size="small" hoverable>
          <Image src={`http://image.tmdb.org/t/p/w440_and_h660_face/${poster_path}`} />
          <div className="text-content">
            <Title level={4}>{title}</Title>
            <div>
              <Text type="secondary">
                {release_date ? format(new Date(release_date), 'MM/dd/yyyy') : 'Дата не определена'}
              </Text>
            </div>
            <Link href="#">
              <Text code>Action</Text>
            </Link>
            <Link href="#">
              <Text code>Drama</Text>
            </Link>
            <div>{description}</div>
          </div>
        </Card>
      </div>
    );
  }
}
