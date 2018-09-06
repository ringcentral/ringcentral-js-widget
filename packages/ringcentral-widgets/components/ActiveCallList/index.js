import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ActiveCallItem from '../ActiveCallItem';
import ActiveCallItemV2 from '../ActiveCallItemV2';
import styles from './styles.scss';

function isConferenceCall(normalizedCall) {
  return normalizedCall
    && normalizedCall.to
    && Array.isArray(normalizedCall.to.phoneNumber)
    && normalizedCall.to.phoneNumber.length === 0
    && normalizedCall.toName === 'Conference';
}

function ActiveCallList({
  calls,
  className,
  currentLocale,
  areaCode,
  countryCode,
  brand,
  showContactDisplayPlaceholder,
  formatPhone,
  onClickToSms,
  onCreateContact,
  onViewContact,
  outboundSmsPermission,
  internalSmsPermission,
  isLoggedContact,
  onLogCall,
  autoLog,
  loggingMap,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  webphoneToVoicemail,
  enableContactFallback,
  title,
  sourceIcons,
  isSessionAConferenceCall,
  onCallItemClick,
  showAvatar,
  getAvatarUrl,
  conferenceCallParties,
  useV2, // TODO: For compatibility, after replacing all ActiveCallItem with ActiveCallItemV2, we should remove this.
  webphoneHold,
  showCallDetail,
  updateSessionMatchedContact,
  renderExtraButton,
  renderContactName
}) {
  if (!calls.length) {
    return null;
  }
  const Component = useV2 ? ActiveCallItemV2 : ActiveCallItem;

  return (
    <div className={classnames(styles.list, className)}>
      <div
        className={styles.listTitle}
        style={{
          marginBottom: useV2 && title ? '-5px' : null
        }}
      >
        {title}
      </div>
      {
        calls.map((call) => {
          const isOnConferenceCall = call.webphoneSession
          ? isSessionAConferenceCall(call.webphoneSession.id)
          : isConferenceCall(call);// in case it's an other device call

          return (
            <Component
              call={call}
              key={call.id}
              isOnConferenceCall={isOnConferenceCall}
              currentLocale={currentLocale}
              areaCode={areaCode}
              countryCode={countryCode}
              brand={brand}
              showContactDisplayPlaceholder={showContactDisplayPlaceholder}
              formatPhone={formatPhone}
              onClickToSms={onClickToSms}
              internalSmsPermission={internalSmsPermission}
              outboundSmsPermission={outboundSmsPermission}
              isLoggedContact={isLoggedContact}
              onLogCall={onLogCall}
              onViewContact={onViewContact}
              onCreateContact={onCreateContact}
              loggingMap={loggingMap}
              webphoneAnswer={webphoneAnswer}
              webphoneReject={webphoneReject}
              webphoneHangup={webphoneHangup}
              webphoneResume={webphoneResume}
              webphoneToVoicemail={webphoneToVoicemail}
              enableContactFallback={enableContactFallback}
              autoLog={autoLog}
              sourceIcons={sourceIcons}
              hasActionMenu={!isOnConferenceCall}
              onClick={() => onCallItemClick(call)}
              showAvatar={showAvatar}
              getAvatarUrl={getAvatarUrl}
              conferenceCallParties={conferenceCallParties}
              webphoneHold={webphoneHold}
              showCallDetail={showCallDetail}
              updateSessionMatchedContact={updateSessionMatchedContact}
              renderExtraButton={renderExtraButton}
              renderContactName={renderContactName}
            />
          );
        })
      }
    </div>
  );
}

ActiveCallList.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  calls: PropTypes.array.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  onViewContact: PropTypes.func,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  isLoggedContact: PropTypes.func,
  onLogCall: PropTypes.func,
  loggingMap: PropTypes.object,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  sourceIcons: PropTypes.object,
  isSessionAConferenceCall: PropTypes.func,
  useV2: PropTypes.bool,
  onCallItemClick: PropTypes.func,
  showAvatar: PropTypes.bool,
  getAvatarUrl: PropTypes.func,
  conferenceCallParties: PropTypes.arrayOf(PropTypes.object),
  webphoneHold: PropTypes.func,
  showCallDetail: PropTypes.bool,
  updateSessionMatchedContact: PropTypes.func,
  renderExtraButton: PropTypes.func,
  renderContactName: PropTypes.func
};

ActiveCallList.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  onViewContact: undefined,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  isSessionAConferenceCall: () => false,
  useV2: false,
  onCallItemClick: i => i,
  showAvatar: true,
  getAvatarUrl: i => i,
  conferenceCallParties: [],
  webphoneHold: i => i,
  showCallDetail: false,
  updateSessionMatchedContact: i => i,
  renderExtraButton: undefined,
  renderContactName: undefined
};

export default ActiveCallList;
