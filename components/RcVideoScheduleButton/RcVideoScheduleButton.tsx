import classnames from 'classnames';
import { RcButton, RcCheckbox } from '@ringcentral-integration/rcui';
import React from 'react';

import { RcVMeetingModel } from 'ringcentral-integration/models/rcv.model';

import i18n from './i18n';
import styles from './styles.scss';

export interface RcVideoScheduleButtonProps {
  currentLocale: string;
  meeting: RcVMeetingModel;
  hidden: boolean;
  disabled: boolean;
  onClick: () => any;
  brand: string;
  showSaveAsDefault: boolean;
  disableSaveAsDefault: boolean;
  update: (args: any) => any;
  buttonLabel: string;
}

function getI18nButtonString() {
  return i18n.getString('schedule');
}

export const RcVideoScheduleButton: React.FunctionComponent<RcVideoScheduleButtonProps> = (
  props,
) => {
  const {
    hidden,
    disabled,
    meeting,
    onClick,
    currentLocale,
    showSaveAsDefault,
    disableSaveAsDefault,
    update,
    buttonLabel,
  } = props;

  return (
    <div
      className={classnames(
        styles.inviteBox,
        !hidden ? styles.withShadow : styles.onlyButton,
        showSaveAsDefault ? null : styles.noCheckbox,
      )}
    >
      {showSaveAsDefault ? (
        <RcCheckbox
          color="primary"
          label={i18n.getString('saveAsDefault', currentLocale)}
          data-sign="saveAsDefault"
          checked={meeting.saveAsDefault}
          disabled={disableSaveAsDefault}
          onChange={() => {
            update({
              ...meeting,
              saveAsDefault: !meeting.saveAsDefault,
            });
          }}
        />
      ) : null}
      <RcButton
        onClick={onClick}
        disabled={disabled}
        data-sign="videoScheduleButton"
        fullWidth
      >
        {buttonLabel || getI18nButtonString()}
      </RcButton>
    </div>
  );
};
