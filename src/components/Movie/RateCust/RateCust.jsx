import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Rate } from 'antd';

export default class RateCust extends Component {
  state = {
    value: 0,
  };

  static defaultProps = {
    id: 0,
    rating: 0,
    onPushRate: () => {},
  };

  static propTypes = {
    id: PropTypes.number,
    rating: PropTypes.number,
    onPushRate: PropTypes.func,
  };

  componentDidMount() {
    const { rating } = this.props;
    this.setState({ value: rating });
  }

  handleChange = (value) => {
    const { onPushRate, id } = this.props;
    this.setState({ value });
    onPushRate(id, value);
  };

  render() {
    const { value } = this.state;
    return <Rate count={10} onChange={this.handleChange} value={value} allowHalf />;
  }
}
