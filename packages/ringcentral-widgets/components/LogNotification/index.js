import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import callDirections from '@ringcentral-integration/commons/enums/callDirections';

import CircleButton from '../CircleButton';
import EndIcon from '../../assets/images/End.svg';

import { Button } from '../Button';
import LogBasicInfo from '../LogBasicInfo';
import styles from './styles.scss';
import i18n from './i18n';
import callControlI18n from '../SmCallControl/i18n';

export default function LogNotification({
  formatPhone,
  currentLog,
  currentLocale,
  showLogButton,
  isExpand,
  onStay,
  onDiscard,
  onSave,
  onExpand,
  currentSession,
  onReject,
  onHangup,
  showEndButton,
  disableLinks,
}) {
  let extraButtons = null;
  if (showEndButton && showLogButton) {
    let endButton = null;
    if (currentSession) {
      const { callStatus, direction } = currentSession;
      const isInComingCall =
        callDirections.inbound === direction &&
        telephonyStatuses.ringing === callStatus;
      const endTitle = isInComingCall ? 'reject' : 'hangup';
      const endAction = isInComingCall ? onReject : onHangup;
      endButton = (
        <span title={callControlI18n.getString(endTitle, currentLocale)}>
          <CircleButton
            dataSign={endTitle}
            showBorder={false}
            icon={EndIcon}
            onClick={endAction}
            className={classnames({
              [styles.hangup]: true,
              [styles.endButton]: true,
              [styles.buttonDisabled]: disableLinks,
            })}
            disabled={disableLinks}
          />
        </span>
      );
    }

    extraButtons = (
      <div className={styles.extraButtonBox}>
        {endButton}
        <Button
          tooltip={i18n.getString('log', currentLocale)}
          disabled={isExpand}
          className={classnames(
            styles.expandButtonWithEnd,
            isExpand && styles.expandDisableButton,
          )}
          onClick={() => onExpand()}
        >
          {i18n.getString('log', currentLocale)}
        </Button>
      </div>
    );
  } else if (showLogButton) {
    extraButtons = (
      <Button
        disabled={isExpand}
        className={classnames(
          styles.expandButton,
          isExpand && styles.expandDisableButton,
        )}
        onClick={() => onExpand()}
      >
        {i18n.getString('log', currentLocale)}
      </Button>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.basicInfo}>
        <LogBasicInfo
          currentLog={currentLog}
          currentLocale={currentLocale}
          formatPhone={formatPhone}
        />
        {extraButtons}
      </div>
      {isExpand ? (
        <div className={styles.confirmationContainer}>
          <div className={styles.confirmationInfo}>
            {i18n.getString('confirmationInfo', currentLocale)}
          </div>
          <div className={styles.confirmationButtons}>
            {onSave ? (
              <Button
                tooltip={i18n.getString('save', currentLocale)}
                className={classnames(styles.saveButton, styles.selected)}
                onClick={() => onSave()}
              >
                {i18n.getString('save', currentLocale)}
              </Button>
            ) : null}
            {onDiscard ? (
              <Button
                tooltip={i18n.getString('discard', currentLocale)}
                className={styles.discardButton}
                onClick={() => onDiscard()}
              >
                {i18n.getString('discard', currentLocale)}
              </Button>
            ) : null}
            {onStay ? (
              <Button
                tooltip={i18n.getString('stay', currentLocale)}
                className={styles.stayButton}
                onClick={() => onStay()}
              >
                {i18n.getString('stay', currentLocale)}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

LogNotification.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  showLogButton: PropTypes.bool,
  currentLog: PropTypes.object,
  formatPhone: PropTypes.func,
  isExpand: PropTypes.bool,
  onStay: PropTypes.func,
  onDiscard: PropTypes.func,
  onSave: PropTypes.func,
  onExpand: PropTypes.func,
  currentSession: PropTypes.object,
  onReject: PropTypes.func,
  onHangup: PropTypes.func,
  showEndButton: PropTypes.bool,
  disableLinks: PropTypes.bool,
};

LogNotification.defaultProps = {
  showLogButton: true,
  currentLog: {},
  formatPhone: undefined,
  isExpand: undefined,
  onStay: undefined,
  onDiscard: undefined,
  onSave: undefined,
  onExpand: undefined,
  currentSession: undefined,
  onReject: () => null,
  onHangup: () => null,
  showEndButton: false,
  disableLinks: false,
};
