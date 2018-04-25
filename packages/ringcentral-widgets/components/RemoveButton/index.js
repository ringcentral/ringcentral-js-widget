import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

function RemoveButton(props) {
  let className = null;
  if (props.visibility) {
    className = classnames(styles.containner, props.className);
  } else {
    className = classnames(styles.containner, props.className, styles.hiddenRemoveButton);
  }
  return (
    <span className={className} onClick={props.visibility ? props.onClick : null}>
      <i className={rcFont.uni2471} />
    </span>
  );
}

RemoveButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  visibility: PropTypes.bool,
};

RemoveButton.defaultProps = {
  className: null,
  visibility: true,
};

export default RemoveButton;
