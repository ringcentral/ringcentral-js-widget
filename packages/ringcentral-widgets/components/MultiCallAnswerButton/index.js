import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AnswerIcon from '../../assets/images/Answer.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import EndIcon from '../../assets/images/End.svg';

import CircleButton from '../CircleButton';

import styles from './styles.scss';

export default function MultiCallAnswerButton(props) {
  const Icon = props.isEndOtherCall ? EndIcon : HoldIcon;
  const iconClassName = classnames(
    styles.button,
    props.isEndOtherCall ? styles.endButton : ''
  );
  const text = props.title.split('\n').map((line, index) => (
    <tspan dy={index ? '1.1em' : 0} x="250" key={line}>
      {line}
    </tspan>
  ));
  return (
    <svg
      className={props.className}
      viewBox="0 0 500 600"
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
    >
      <CircleButton
        width="200"
        height="200"
        x={60}
        y={50}
        className={iconClassName}
        onClick={props.onClick}
        icon={Icon}
      />
      <CircleButton
        width="250"
        height="250"
        x={200}
        y={110}
        className={classnames(styles.button, styles.answer)}
        showBorder={false}
        onClick={props.onClick}
        icon={AnswerIcon}
      />
      <text
        className={styles.buttonTitle}
        x="250"
        y="500"
        textAnchor="middle"
      >
        {text}
      </text>
    </svg>
  );
}

MultiCallAnswerButton.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isEndOtherCall: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
};

MultiCallAnswerButton.defaultProps = {
  className: null,
  isEndOtherCall: true,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
};
