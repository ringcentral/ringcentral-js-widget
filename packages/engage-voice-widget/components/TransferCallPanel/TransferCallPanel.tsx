import {
  RcButton,
  RcCheckbox,
  RcIcon,
  RcSnackbarAction,
  RcTextField,
} from '@ringcentral-integration/rcui';
import dialerSvg from '@ringcentral-integration/rcui/icons/icon-dialer.svg';
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import BackHeader from 'ringcentral-widgets/components/BackHeaderV2';
import { CustomArrowButton } from 'ringcentral-widgets/components/Rcui/CustomArrowButton';
import classNames from 'classnames';

import {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
} from '../../interfaces';
import { PickList } from '../PickList';
import i18n from './i18n';
import styles from './styles.scss';

export type TransferCallPanelProps = Pick<
  EvTransferCallUIProps & EvTransferCallUIFunctions,
  | 'currentLocale'
  | 'goBack'
  | 'clickCallRecipient'
  | 'transferring'
  | 'clickTransferTypeFiled'
  | 'setStayOnCall'
  | 'isStayOnCall'
  | 'transferOptions'
  | 'selectedTransferType'
  | 'textFields'
  | 'transferCallDisabled'
  | 'transferCall'
  | 'setCancelTemplate'
  | 'cancelTransfer'
  | 'cancelTransferPage'
  | 'isWide'
>;

const TransferCallPanel: FunctionComponent<TransferCallPanelProps> = ({
  currentLocale,
  goBack,
  clickCallRecipient,
  transferring,
  clickTransferTypeFiled,
  setStayOnCall,
  isStayOnCall,
  transferOptions,
  selectedTransferType,
  textFields,
  transferCallDisabled,
  transferCall,
  setCancelTemplate,
  cancelTransfer,
  cancelTransferPage,
  isWide,
}) => {
  useEffect(() => {
    setCancelTemplate(
      <RcSnackbarAction onClick={() => cancelTransfer()}>
        {i18n.getString('cancel', currentLocale)}
      </RcSnackbarAction>,
    );
  }, []);

  const endAdornment = useCallback(
    (disabled) =>
      selectedTransferType === 'manualEntry' ? (
        <RcIcon size="medium" color={['primary', 'main']} symbol={dialerSvg} />
      ) : (
        <CustomArrowButton disabled={disabled} />
      ),
    [selectedTransferType],
  );

  return (
    <>
      <BackHeader
        currentLocale={currentLocale}
        className={styles.backHeader}
        title={i18n.getString('transfer', currentLocale)}
        onBackClick={goBack}
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <PickList
            data-sign="transferType"
            options={transferOptions}
            label={i18n.getString('transferType', currentLocale)}
            optionValueKey="type"
            value={selectedTransferType}
            onChange={(type) => {
              clickTransferTypeFiled(type);
            }}
          />
          {textFields?.map(
            (
              { label, value, placeholder, disabled, readonly, router },
              index,
            ) => (
              <RcTextField
                key={index}
                data-sign={`callRecipient${index}`}
                disabled={disabled}
                label={label}
                value={value}
                fullWidth
                clearBtn={false}
                placeholder={placeholder}
                classes={{
                  root: readonly ? styles.nonePointerEvent : undefined,
                }}
                InputProps={
                  !readonly
                    ? {
                        readOnly: true,
                        endAdornment: endAdornment(disabled),
                      }
                    : undefined
                }
                onClick={() => clickCallRecipient(router)}
              />
            ),
          )}
          <RcCheckbox
            data-sign="stayOnCall"
            color="primary"
            label={i18n.getString('stayOnCall', currentLocale)}
            checked={isStayOnCall}
            onClick={() => setStayOnCall(isStayOnCall)}
            formControlLabelProps={{
              classes: { root: styles.stayOnCall },
            }}
          />
        </div>
        <div className={styles.buttons}>
          <RcButton
            data-sign="cancel"
            classes={{
              root: styles.cancelButton,
            }}
            fullWidth={!isWide}
            size="medium"
            onClick={cancelTransferPage}
            variant="outlined"
          >
            {i18n.getString('cancel', currentLocale)}
          </RcButton>
          <RcButton
            data-sign="transferCall"
            disabled={transferCallDisabled}
            loading={transferring}
            fullWidth={!isWide}
            size="medium"
            onClick={transferCall}
          >
            {i18n.getString('Transfer', currentLocale)}
          </RcButton>
        </div>
      </div>
    </>
  );
};

export { TransferCallPanel };