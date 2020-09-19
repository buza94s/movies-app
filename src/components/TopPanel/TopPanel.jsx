import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './TopPanel.css';

export default class TopPanel extends Component {
  state = {};

  static defaultProps = {
    topPanel: false,
    onTopPanel: () => {},
  };

  static propTypes = {
    topPanel: PropTypes.bool,
    onTopPanel: PropTypes.func,
  };

  render() {
    const { topPanel, onTopPanel } = this.props;
    return (
      <div className="top-panel">
        <button className={clsx('top-button', !topPanel && 'active')} type="button" onClick={() => onTopPanel(false)}>
          Поиск
        </button>
        <button
          className={clsx('top-button', 'top-panel__top-button', topPanel && 'active')}
          type="button"
          onClick={() => onTopPanel(true)}
        >
          Оцененные фильмы
        </button>
      </div>
    );
  }
}
