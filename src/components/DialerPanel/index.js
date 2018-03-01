import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DialPad from '../DialPad';
import RecipientsInput from '../RecipientsInput';
import FromField from '../FromField';
import SpinnerOverlay from '../SpinnerOverlay';
import CircleButton from '../CircleButton';
import AnswerIcon from '../../assets/images/Answer.svg';

import styles from './styles.scss';

function DialerPanel({
  callButtonDisabled,
  className,
  onToNumberChange,
  onCallButtonClick,
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
  searchContact,
  searchContactList,
  recipient,
  clearToNumber,
  setRecipient,
  clearRecipient,
  phoneTypeRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
}) {
  const onCallFunc = () => {
    if (!callButtonDisabled) {
      onCallButtonClick();
    }
  };
  const content = showSpinner ? (<SpinnerOverlay />) : null;
  return (
    <div className={classnames(styles.root, className)}>
      <RecipientsInput
        value={toNumber}
        onChange={onToNumberChange}
        onClean={clearToNumber}
        recipient={recipient}
        addToRecipients={setRecipient}
        removeFromRecipients={clearRecipient}
        searchContact={searchContact}
        searchContactList={searchContactList}
        formatContactPhone={formatPhone}
        currentLocale={currentLocale}
        phoneTypeRenderer={phoneTypeRenderer}
        contactInfoRenderer={recipientsContactInfoRenderer}
        contactPhoneRenderer={recipientsContactPhoneRenderer}
        titleEnabled
        autoFocus
      />
      <div className={styles.inputFields}>
        <FromField
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
            onToNumberChange(toNumber + key);
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
  onCallButtonClick: PropTypes.func.isRequired,
  callButtonDisabled: PropTypes.bool,
  isWebphoneMode: PropTypes.bool,
  toNumber: PropTypes.string,
  onToNumberChange: PropTypes.func,
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
  searchContact: PropTypes.func.isRequired,
  searchContactList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  recipient: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  clearToNumber: PropTypes.func.isRequired,
  setRecipient: PropTypes.func.isRequired,
  clearRecipient: PropTypes.func.isRequired,
  phoneTypeRenderer: PropTypes.func,
  recipientsContactInfoRenderer: PropTypes.func,
  recipientsContactPhoneRenderer: PropTypes.func,
};

DialerPanel.defaultProps = {
  className: null,
  fromNumber: null,
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: () => null,
  onToNumberChange: () => null,
  formatPhone: phoneNumber => phoneNumber,
  showSpinner: false,
  dialButtonVolume: 1,
  dialButtonMuted: false,
  recipient: [],
  phoneTypeRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
};

export default DialerPanel;
