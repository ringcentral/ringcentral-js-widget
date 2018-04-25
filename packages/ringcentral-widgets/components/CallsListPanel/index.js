import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpinnerOverlay from '../SpinnerOverlay';
import ActiveCallItem from '../ActiveCallItem';
import CallList from '../CallList';
import InsideModal from '../InsideModal';
import LogSection from '../LogSection';
import LogNotification from '../LogNotification';

import styles from './styles.scss';
import i18n from './i18n';

// TODO it is ActiveCallsPanel's function is the same, and remove ActiveCallsPanel after migration.

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
  disableLinks,
  renderContactName,
  renderExtraButton,
  contactDisplayStyle,
}) {
  if (calls.length === 0) {
    return null;
  }
  return (
    <div className={classnames(styles.list, className)}>
      <div className={styles.listTitle}>
        {title}
      </div>
      {
        calls.map(call => (
          <ActiveCallItem
            call={call}
            key={call.id}
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
            disableLinks={disableLinks}
            renderContactName={renderContactName}
            renderExtraButton={renderExtraButton}
            contactDisplayStyle={contactDisplayStyle}
          />
        ))
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
  disableLinks: PropTypes.bool,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
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
  disableLinks: false,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
};

export default class CallsListPanel extends Component {
  componentDidMount() {
    if (
      !this.hasCalls(this.props) &&
      typeof this.props.onCallsEmpty === 'function'
    ) {
      this.props.onCallsEmpty();
    }
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.hasCalls(this.props) &&
      !this.hasCalls(nextProps) &&
      typeof this.props.onCallsEmpty === 'function'
    ) {
      this.props.onCallsEmpty();
    }
  }

  hasCalls(props = this.props) {
    return (
      props.activeRingCalls.length > 0 ||
      props.activeOnHoldCalls.length > 0 ||
      props.activeCurrentCalls.length > 0 ||
      props.otherDeviceCalls.length > 0 ||
      props.calls.length > 0
    );
  }

  render() {
    const {
      activeRingCalls,
      activeOnHoldCalls,
      activeCurrentCalls,
      otherDeviceCalls,
      showSpinner,
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
      enableContactFallback,
      webphoneToVoicemail,
      sourceIcons,
      onClickToDial,
      disableLinks,
      disableClickToDial,
      dateTimeFormatter,
      calls,
      active,
      renderContactName,
      renderExtraButton,
      contactDisplayStyle,
      activeContactDisplayStyle,
      currentLog,
      onCloseLogSection,
      onUpdateCallLog,
      onSaveCallLog,
      renderEditLogSection,
      logNotification,
      onCloseNotification,
      onDiscardNotification,
      onSaveNotification,
      onExpandNotification,
    } = this.props;
    if (showSpinner) {
      return (<SpinnerOverlay />);
    }
    if (!this.hasCalls()) {
      return (
        <div className={classnames(styles.root, currentLog && currentLog.showLog ? styles.hiddenScroll : '', className)}>
          <p className={styles.noCalls}>
            {i18n.getString('noCalls', currentLocale)}
          </p>
        </div>
      );
    }
    const logSection = currentLog ? (
      <div>
        <InsideModal
          title={currentLog.title}
          show={currentLog.showLog}
          onClose={onCloseLogSection}>
          <LogSection
            currentLocale={currentLocale}
            currentLog={currentLog}
            isInnerMask={logNotification && logNotification.notificationIsExpand}
            renderEditLogSection={renderEditLogSection}
            formatPhone={formatPhone}
            onUpdateCallLog={onUpdateCallLog}
            onSaveCallLog={onSaveCallLog}
          />
        </InsideModal>
        {
          logNotification ? (
            <InsideModal
              show={logNotification.showNotification}
              containerStyles={styles.notificationContainer}
              modalStyles={styles.notificationModal}
              contentStyle={styles.notificationContent}
              onClose={onCloseNotification}>
              <LogNotification
                currentLocale={currentLocale}
                formatPhone={formatPhone}
                currentLog={logNotification}
                isExpand={logNotification.notificationIsExpand}
                onSave={onSaveNotification}
                onExpand={onExpandNotification}
                onDiscard={onDiscardNotification}
                onStay={onCloseNotification}
              />
            </InsideModal>
          ) : null
        }
      </div>
    ) : null;
    const getCallList = (calls, title) => (
      <ActiveCallList
        title={title}
        calls={calls}
        currentLocale={currentLocale}
        areaCode={areaCode}
        countryCode={countryCode}
        brand={brand}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        formatPhone={formatPhone}
        onClickToSms={onClickToSms}
        onCreateContact={onCreateContact}
        onViewContact={onViewContact}
        outboundSmsPermission={outboundSmsPermission}
        internalSmsPermission={internalSmsPermission}
        isLoggedContact={isLoggedContact}
        onLogCall={onLogCall}
        autoLog={autoLog}
        loggingMap={loggingMap}
        webphoneAnswer={webphoneAnswer}
        webphoneReject={webphoneReject}
        webphoneHangup={webphoneHangup}
        webphoneResume={webphoneResume}
        webphoneToVoicemail={webphoneToVoicemail}
        enableContactFallback={enableContactFallback}
        sourceIcons={sourceIcons}
        disableLinks={disableLinks}
        renderContactName={renderContactName}
        renderExtraButton={renderExtraButton}
        contactDisplayStyle={activeContactDisplayStyle}
      />
    );
    const historyCall = showSpinner ?
      <SpinnerOverlay /> :
      (
        <div className={classnames(styles.list, className)}>
          <div className={styles.listTitle}>
            {i18n.getString('historyCalls', currentLocale)}
          </div>
          <CallList
            brand={brand}
            currentLocale={currentLocale}
            calls={calls}
            areaCode={areaCode}
            countryCode={countryCode}
            onViewContact={onViewContact}
            onCreateContact={onCreateContact}
            onLogCall={onLogCall}
            onClickToDial={onClickToDial}
            onClickToSms={onClickToSms}
            isLoggedContact={isLoggedContact}
            disableLinks={disableLinks}
            disableClickToDial={disableClickToDial}
            outboundSmsPermission={outboundSmsPermission}
            internalSmsPermission={internalSmsPermission}
            dateTimeFormatter={dateTimeFormatter}
            active={active}
            loggingMap={loggingMap}
            webphoneAnswer={webphoneAnswer}
            webphoneReject={webphoneReject}
            webphoneHangup={webphoneHangup}
            webphoneResume={webphoneResume}
            enableContactFallback={enableContactFallback}
            autoLog={autoLog}
            showContactDisplayPlaceholder={showContactDisplayPlaceholder}
            sourceIcons={sourceIcons}
            renderContactName={renderContactName}
            renderExtraButton={renderExtraButton}
            contactDisplayStyle={contactDisplayStyle}
          />
        </div>
      );
    return (
      <div className={styles.container}>
        <div className={classnames(styles.root, className)}>
          {getCallList(activeRingCalls, i18n.getString('ringCall', currentLocale))}
          {getCallList(activeCurrentCalls, i18n.getString('currentCall', currentLocale))}
          {getCallList(activeOnHoldCalls, i18n.getString('onHoldCall', currentLocale))}
          {getCallList(otherDeviceCalls, i18n.getString('otherDeviceCall', currentLocale))}
          { calls.length > 0 ? historyCall : null }
        </div>
        {logSection}
      </div>
    );
  }

}

CallsListPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeRingCalls: PropTypes.array.isRequired,
  activeOnHoldCalls: PropTypes.array.isRequired,
  activeCurrentCalls: PropTypes.array.isRequired,
  otherDeviceCalls: PropTypes.array.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  isLoggedContact: PropTypes.func,
  onLogCall: PropTypes.func,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  autoLog: PropTypes.bool,
  onViewContact: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  loggingMap: PropTypes.object,
  onCallsEmpty: PropTypes.func,
  sourceIcons: PropTypes.object,
  calls: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClickToDial: PropTypes.func,
  disableLinks: PropTypes.bool.isRequired,
  disableClickToDial: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  active: PropTypes.bool,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
  activeContactDisplayStyle: PropTypes.string,
  currentLog: PropTypes.object,
  onCloseLogSection: PropTypes.func,
  onUpdateCallLog: PropTypes.func,
  onSaveCallLog: PropTypes.func,
  renderEditLogSection: PropTypes.func,
  logNotification: PropTypes.object,
  onCloseNotification: PropTypes.func,
  onDiscardNotification: PropTypes.func,
  onSaveNotification: PropTypes.func,
  onExpandNotification: PropTypes.func,
};

CallsListPanel.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  onViewContact: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  enableContactFallback: undefined,
  loggingMap: {},
  autoLog: false,
  onCallsEmpty: undefined,
  sourceIcons: undefined,
  onClickToDial: undefined,
  disableClickToDial: false,
  active: false,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: styles.contactDisplay,
  activeContactDisplayStyle: styles.activeContactDisplay,
  currentLog: undefined,
  onCloseLogSection: undefined,
  onUpdateCallLog: undefined,
  onSaveCallLog: undefined,
  renderEditLogSection: undefined,
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
};
