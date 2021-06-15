import React, { useRef } from 'react';
import sleep from 'ringcentral-integration/lib/sleep';
import { RcMMeetingModel } from 'ringcentral-integration/modules/MeetingV2';
import { RcVMeetingModel } from 'ringcentral-integration/interfaces/Rcv.model';
import { SpinnerOverlay } from '../SpinnerOverlay';
import MeetingConfigs from '../MeetingConfigs';
import isSafari from '../../lib/isSafari';

import { VideoConfig } from '../VideoPanel/VideoConfig';
import { Topic, TopicRef } from '../InnerTopic';
import { MeetingConfigs as MeetingConfigsV2 } from '../MeetingConfigsV2';

import { GenericMeetingPanelProps } from './interface';
import styles from './styles.scss';

const GenericMeetingPanel: React.ComponentType<GenericMeetingPanelProps> = (
  props,
) => {
  const topicRef = useRef<TopicRef>(null);

  const { showCustom, CustomPanel } = props;
  if (showCustom) {
    return CustomPanel as JSX.Element;
  }

  const {
    useRcmV2,
    meeting,
    disabled,
    configDisabled,
    currentLocale,
    scheduleButton: ScheduleButton,
    recipientsSection,
    showTopic,
    showWhen,
    showDuration,
    showRecurringMeeting,
    openNewWindow,
    meetingOptionToggle,
    passwordPlaceholderEnable,
    audioOptionToggle,
    onOK,
    init,
    showSaveAsDefault,
    disableSaveAsDefault,
    updateMeetingSettings,
    validatePasswordSettings,
    isRCM,
    isRCV,
    datePickerSize,
    timePickerSize,
    checkboxSize,
    showLaunchMeetingBtn,
    launchMeeting,
    scheduleButtonLabel,
    appCode,
    schedule,
    showSpinner,
    showRcvAdminLock,
    showPmiAlert,
    enablePersonalMeeting,
    enableWaitingRoom,
    personalMeetingId,
    switchUsePersonalMeetingId,
    updateHasSettingsChanged,
    showScheduleOnBehalf,
    delegators,
    updateScheduleFor,
    labelPlacement,
    showSpinnerInConfigPanel,
    enableServiceWebSettings,
    recurringMeetingPosition,
    defaultTopic,
  } = props;

  if (showSpinner) {
    return <SpinnerOverlay />;
  }
  return (
    <div className={styles.wrapper}>
      {isRCM && !useRcmV2 && (
        <MeetingConfigs
          useTimePicker
          update={updateMeetingSettings}
          init={init}
          meeting={meeting as RcMMeetingModel}
          disabled={configDisabled}
          currentLocale={currentLocale}
          recipientsSection={recipientsSection}
          showWhen={showWhen}
          showTopic={showTopic}
          showDuration={showDuration}
          showRecurringMeeting={showRecurringMeeting}
          meetingOptionToggle={meetingOptionToggle}
          passwordPlaceholderEnable={passwordPlaceholderEnable}
          audioOptionToggle={audioOptionToggle}
          enablePersonalMeeting={enablePersonalMeeting}
          personalMeetingId={personalMeetingId}
          switchUsePersonalMeetingId={switchUsePersonalMeetingId}
        />
      )}
      {isRCM && useRcmV2 && (
        <MeetingConfigsV2
          disabled={configDisabled}
          defaultTopic={defaultTopic}
          showSpinnerInConfigPanel={showSpinnerInConfigPanel}
          updateMeetingSettings={updateMeetingSettings}
          personalMeetingId={personalMeetingId}
          switchUsePersonalMeetingId={switchUsePersonalMeetingId}
          init={init}
          labelPlacement={labelPlacement}
          meeting={meeting as RcMMeetingModel}
          currentLocale={currentLocale}
          recipientsSection={recipientsSection}
          showTopic={showTopic}
          showWhen={showWhen}
          showDuration={showDuration}
          showRecurringMeeting={showRecurringMeeting}
          meetingOptionToggle={meetingOptionToggle}
          audioOptionToggle={audioOptionToggle}
          showScheduleOnBehalf={showScheduleOnBehalf}
          delegators={delegators}
          updateScheduleFor={updateScheduleFor}
          enableServiceWebSettings={enableServiceWebSettings}
          recurringMeetingPosition={recurringMeetingPosition}
          datePickerSize={datePickerSize}
          timePickerSize={timePickerSize}
          checkboxSize={checkboxSize}
        >
          {showTopic && (
            <Topic
              name={(meeting as RcMMeetingModel).topic}
              updateMeetingTopic={(topic) => {
                updateMeetingSettings({ ...meeting, topic });
              }}
              currentLocale={currentLocale}
              ref={topicRef}
              defaultTopic={defaultTopic}
            />
          )}
        </MeetingConfigsV2>
      )}
      {isRCV && (
        <VideoConfig
          disabled={configDisabled}
          currentLocale={currentLocale}
          labelPlacement={labelPlacement}
          meeting={meeting as RcVMeetingModel}
          updateScheduleFor={updateScheduleFor}
          updateMeetingSettings={updateMeetingSettings}
          validatePasswordSettings={validatePasswordSettings}
          recipientsSection={recipientsSection}
          showTopic={showTopic}
          showWhen={showWhen}
          showDuration={showDuration}
          init={init}
          datePickerSize={datePickerSize}
          timePickerSize={timePickerSize}
          checkboxSize={checkboxSize}
          showRcvAdminLock={showRcvAdminLock}
          showPmiAlert={showPmiAlert}
          enableWaitingRoom={enableWaitingRoom}
          enablePersonalMeeting={enablePersonalMeeting}
          personalMeetingId={personalMeetingId}
          switchUsePersonalMeetingId={switchUsePersonalMeetingId}
          updateHasSettingsChanged={updateHasSettingsChanged}
          showScheduleOnBehalf={showScheduleOnBehalf}
          showSpinnerInConfigPanel={showSpinnerInConfigPanel}
          delegators={delegators}
        >
          {showTopic && (
            <Topic
              name={(meeting as RcVMeetingModel).name}
              updateMeetingTopic={(name) => {
                updateMeetingSettings({ name });
              }}
              currentLocale={currentLocale}
              ref={topicRef}
              defaultTopic={defaultTopic}
            />
          )}
        </VideoConfig>
      )}
      {(isRCM || isRCV) && ScheduleButton && (
        <ScheduleButton
          currentLocale={currentLocale}
          disabled={disabled}
          meeting={meeting}
          onOK={onOK}
          onClick={async () => {
            if (!disabled) {
              await sleep(100);
              const opener = openNewWindow && isSafari() ? window.open() : null;

              const meetingSetting = isRCM
                ? {
                    ...meeting,
                    topic: useRcmV2 ? topicRef.current?.value : meeting.topic,
                  }
                : {
                    ...meeting,
                    name: topicRef.current?.value,
                  };
              await schedule(meetingSetting, opener);
            }
          }}
          update={updateMeetingSettings}
          showSaveAsDefault={showSaveAsDefault}
          disableSaveAsDefault={disableSaveAsDefault}
          launchMeeting={launchMeeting}
          showLaunchMeetingBtn={showLaunchMeetingBtn}
          appCode={appCode}
          scheduleButtonLabel={scheduleButtonLabel}
        />
      )}
    </div>
  );
};

GenericMeetingPanel.defaultProps = {
  launchMeeting() {},
  disabled: false,
  showWhen: true,
  showTopic: true,
  showDuration: true,
  showRecurringMeeting: true,
  openNewWindow: true,
  meetingOptionToggle: false,
  passwordPlaceholderEnable: false,
  audioOptionToggle: false,
  onOK: undefined,
  scheduleButton: undefined,
  showRcvAdminLock: false,
  showPmiAlert: false,
  enableWaitingRoom: false,
  enablePersonalMeeting: false,
  showSaveAsDefault: true,
  disableSaveAsDefault: false,
  showCustom: false,
  showLaunchMeetingBtn: false,
  appCode: '',
  scheduleButtonLabel: '',
  personalMeetingId: undefined,
  showSpinner: false,
  useRcmV2: false,
  labelPlacement: 'start',
  enableServiceWebSettings: false,
  recurringMeetingPosition: 'middle',
};

export { GenericMeetingPanel };
