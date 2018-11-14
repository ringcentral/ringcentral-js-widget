import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CircleButton from '../CircleButton';
import Transfer from '../../../assets/images/Transfer.svg';
import styles from './styles.scss';

function TransferIcon({ onClick, showBorder, disabled }) {
  const iconCls = classnames(styles.transferButton, {
    [styles.disabled]: disabled
  });
  return (
    <CircleButton
      className={iconCls}
      onClick={onClick}
      iconWidth={260}
      iconX={120}
      icon={Transfer}
      showBorder={showBorder}
      disabled={disabled}
    />
  );
}

TransferIcon.propTypes = {
  onClick: PropTypes.func,
  showBorder: PropTypes.bool,
  disabled: PropTypes.bool,
};

TransferIcon.defaultProps = {
  onClick() {},
  showBorder: true,
  disabled: true,
};

export default TransferIcon;
