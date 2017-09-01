import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DialPad from '../DialPad';
import CircleButton from '../CircleButton';
import BackHeader from '../BackHeader';

import EndIcon from '../../assets/images/End.svg';

import styles from './styles.scss';
import i18n from './i18n';

class ActiveCallDialPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onButtonOutput = (key) => {
      this.setState((preState) => {
        const value = preState.value + key;
        this.props.onChange(key);
        return { value };
      });
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.props.hiddenDialPad}
          >
          {i18n.getString('keypad', this.props.currentLocale)}
        </BackHeader>
        <div className={styles.dialInput}>
          <input
            className={styles.input}
            value={this.state.value}
          />
        </div>
        <div className={styles.padContainer}>
          <DialPad
            className={styles.dialPad}
            onButtonOutput={this.onButtonOutput}
          />
          <div className={styles.buttonRow}>
            <div className={styles.button}>
              <CircleButton
                className={styles.stopButton}
                onClick={this.props.onHangup}
                icon={EndIcon}
                showBorder={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ActiveCallDialPad.propTypes = {
  onChange: PropTypes.func.isRequired,
  hiddenDialPad: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

export default ActiveCallDialPad;

