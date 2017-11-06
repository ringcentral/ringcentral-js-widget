import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DialPad from '../DialPad';
import DialTextInput from '../DialTextInput';
import CallIdSelect from '../CallIdSelect';
import SpinnerOverlay from '../SpinnerOverlay';
import CircleButton from '../CircleButton';
import AnswerIcon from '../../assets/images/Answer.svg';

import styles from './styles.scss';

function DialerPanel({
  callButtonDisabled,
  className,
  keepToNumber,
  onCall,
  toNumber,
  fromNumber,
  fromNumbers,
  changeFromNumber,
  formatPhone,
  isWebphoneMode,
  currentLocale,
  showSpinner,
  dialButtonVolume,
  dialButtonMuted,
}) {
  const onCallFunc = () => {
    if (!callButtonDisabled) {
      onCall();
    }
  };
  const content = showSpinner ? (<SpinnerOverlay />) : null;
  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.inputFields}>
        <DialTextInput
          value={toNumber}
          onChangeEvent={(event) => {
            keepToNumber(event.currentTarget.value);
          }}
          onDelete={() => {
            keepToNumber('');
          }}
          autoFocus
        />
        <CallIdSelect
          fromNumber={fromNumber}
          fromNumbers={fromNumbers}
          onChange={changeFromNumber}
          formatPhone={formatPhone}
          currentLocale={currentLocale}
          hidden={!isWebphoneMode}
        />
      </div>
      <div className={styles.dialButtons}>
        <DialPad
          className={styles.dialPad}
          onButtonOutput={(key) => {
            keepToNumber(toNumber + key);
          }}
          dialButtonVolume={dialButtonVolume}
          dialButtonMuted={dialButtonMuted}
          />
        <div className={classnames(styles.callBtnRow)}>
          <div className={styles.callBtn}>
            <CircleButton
              className={classnames(
                styles.dialBtn,
                callButtonDisabled && styles.disabled,
              )}
              onClick={onCallFunc}
              disabled={callButtonDisabled}
              icon={AnswerIcon}
              showBorder={false}
            />
          </div>
        </div>
      </div>
      {content}
    </div>
  );
}
DialerPanel.propTypes = {
  className: PropTypes.string,
  onCall: PropTypes.func.isRequired,
  callButtonDisabled: PropTypes.bool,
  isWebphoneMode: PropTypes.bool,
  toNumber: PropTypes.string,
  keepToNumber: PropTypes.func,
  fromNumber: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  fromNumbers: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string,
    usageType: PropTypes.string,
  })),
  changeFromNumber: PropTypes.func,
  formatPhone: PropTypes.func,
  showSpinner: PropTypes.bool,
  dialButtonVolume: PropTypes.number,
  dialButtonMuted: PropTypes.bool,
};

DialerPanel.defaultProps = {
  className: null,
  fromNumber: null,
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: () => null,
  keepToNumber: () => null,
  formatPhone: phoneNumber => phoneNumber,
  showSpinner: false,
  dialButtonVolume: 1,
  dialButtonMuted: false,
};

export default DialerPanel;
