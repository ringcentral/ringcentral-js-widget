import { RcButton, RcMenu, RcMenuItem } from '@ringcentral-integration/rcui';
import classNames from 'classnames';
import React, { FunctionComponent, useRef, useState } from 'react';
import { BasicCallInfo } from 'ringcentral-widgets/components/BasicCallInfo';
import CallLogPanel from 'ringcentral-widgets/components/CallLogPanel';
import SaveLogButton from 'ringcentral-widgets/components/SaveLogButton';

import { transferTypes } from '../../enums';
import {
  EvActivityCallUIFunctions,
  EvActivityCallUIProps,
} from '../../interfaces/EvActivityCallUI.interface';
import { EvSmallCallControl } from '../EvSmallCallControl';
import i18n from './i18n';
import styles from './styles.scss';
import { EditLogSection, getButtonText } from './utils';

export type ActivityCallLogPanelProps = EvActivityCallUIProps &
  EvActivityCallUIFunctions;

export const ActivityCallLogPanel: FunctionComponent<ActivityCallLogPanelProps> = ({
  currentLocale,
  currentLog,
  basicInfo,
  isInbound,
  disposeCall,
  status,
  saveStatus,
  goToRequeueCallPage,
  goToTransferCallPage,
  onMute,
  onUnmute,
  onHangup,
  onReject,
  onHold,
  onUnHold,
  isOnMute,
  isOnHold,
  smallCallControlSize,
  isInComingCall,
  currentCallControlPermission: { allowTransferCall, allowRequeueCall },
  disableDispose,
  disableTransfer,
  disableInternalTransfer,
  disableHold,
  disableHangup,
  disableMute,
  disableActive,
  isOnActive,
  onActive,
  isWide,
  ...rest
}) => {
  const transferRef = useRef(null);
  const [transferEl, setTransferRef] = useState(null);
  const [isOnTransfer, setOnTransfer] = useState(false);
  const isActivity = status === 'active';
  const isCallEnd = status === 'callEnd';
  const isLoading = saveStatus === 'saving';
  const onTransfer = () => {
    setOnTransfer(true);
    setTransferRef(transferRef.current);
  };
  const handleTransferClose = () => {
    setOnTransfer(false);
    setTransferRef(null);
  };

  const callControlRef = useRef<HTMLElement>(null);

  return (
    <CallLogPanel
      {...rest}
      currentLog={currentLog}
      currentLocale={currentLocale}
      classes={{
        root: styles.root,
        callLogCallControl: classNames(
          styles.callLogCallControl,
          isCallEnd ? styles.noneShadow : styles.smallCallControlRoot,
        ),
      }}
      refs={{
        callLogCallControl: callControlRef,
      }}
      isWide={isWide}
      header={false}
      showSpinner={false}
      isInTransferPage={false}
      // TODO: that need refactor CallLogPanel and then can remove that
      currentIdentify="123"
      renderSaveLogButton={(props) => <SaveLogButton {...props} />}
      renderEditLogSection={EditLogSection}
      renderBasicInfo={() => {
        return (
          <BasicCallInfo
            status={status}
            currentLocale={currentLocale}
            isInbound={isInbound}
            isRinging={isActivity}
            subject={basicInfo.subject}
            followInfos={basicInfo.followInfos}
            callInfos={basicInfo.callInfos}
            callControlRef={callControlRef}
            classes={{
              panel: isCallEnd && styles.noneShadow,
            }}
          />
        );
      }}
      renderCallLogCallControl={() => {
        return isCallEnd ? (
          <RcButton
            data-sign="submit"
            size="large"
            fullWidth
            disabled={disableDispose}
            loading={isLoading}
            onClick={() => disposeCall()}
          >
            {getButtonText(saveStatus, currentLocale)}
          </RcButton>
        ) : (
          <>
            <RcMenu
              classes={{ paper: styles.paper }}
              anchorEl={transferEl}
              open={Boolean(transferEl)}
              onClose={handleTransferClose}
              data-sign="transferMenu"
            >
              <RcMenuItem
                onClick={() => goToTransferCallPage(transferTypes.internal)}
                disabled={!allowTransferCall || disableInternalTransfer}
                data-sign="transferItem-internalTransfer"
              >
                {i18n.getString('internalTransfer', currentLocale)}
              </RcMenuItem>
              <RcMenuItem
                onClick={() => goToTransferCallPage(transferTypes.phoneBook)}
                disabled={!allowTransferCall}
                data-sign="transferItem-phoneBookTransfer"
              >
                {i18n.getString('phoneBookTransfer', currentLocale)}
              </RcMenuItem>
              <RcMenuItem
                onClick={() => goToRequeueCallPage()}
                disabled={!allowRequeueCall}
                data-sign="transferItem-queueTransfer"
              >
                {i18n.getString('queueTransfer', currentLocale)}
              </RcMenuItem>
              <RcMenuItem
                onClick={() => goToTransferCallPage(transferTypes.manualEntry)}
                disabled={!allowTransferCall}
                data-sign="transferItem-enterANumber"
              >
                {i18n.getString('enterANumber', currentLocale)}
              </RcMenuItem>
            </RcMenu>
            <EvSmallCallControl
              onMute={onMute}
              onUnmute={onUnmute}
              onHangup={onHangup}
              onReject={onReject}
              onHold={onHold}
              onTransfer={onTransfer}
              onUnHold={onUnHold}
              onActive={onActive}
              isOnMute={isOnMute}
              currentLocale={currentLocale}
              isOnTransfer={isOnActive || isOnTransfer}
              isOnHold={isOnHold}
              transferRef={transferRef}
              size={smallCallControlSize}
              isInComingCall={isInComingCall}
              disableTransfer={disableTransfer}
              disableHold={disableHold}
              disableHangup={disableHangup}
              disableMute={disableMute}
              disableActive={disableActive}
              isOnActive={isOnActive}
            />
          </>
        );
      }}
    />
  );
};

ActivityCallLogPanel.defaultProps = {
  basicInfo: {},
};
