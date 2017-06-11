import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

function Line(props) {
  return (
    <div
      className={classnames(
        styles.root,
        props.className,
        props.onClick && styles.clickable,
        props.horizontal && styles.horizontal,
        props.noBorder && styles.noborder,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

Line.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  horizontal: PropTypes.bool,
  noBorder: PropTypes.bool,
};

Line.defaultProps = {
  noBorder: false
};

export default Line;
