import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';


function InputField(props) {
  return (
    <div data-sign={props.dataSign} className={classnames(styles.root, props.className)}>
      <div className={styles.label}>
        {props.label}
        <div className={styles.hint}>
          {props.labelHint}
        </div>
      </div>
      <div className={styles.inputHolder}>
        {props.children}
      </div>
    </div>
  );
}

InputField.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  labelHint: PropTypes.node,
  className: PropTypes.string,
  dataSign: PropTypes.string,
};
InputField.defaultProps = {
  children: undefined,
  label: undefined,
  labelHint: undefined,
  className: undefined,
  dataSign: undefined,
};

export default InputField;
