import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import formatNumber from 'ringcentral-integration/lib/formatNumber';

import ConversationPanel from '../../components/ConversationPanel';

class ConversationPage extends Component {
  getChildContext() {
    return {
      formatPhone: this.props.formatNumber,
      formatDateTime: this.props.formatDateTime,
      changeDefaultRecipient: this.props.changeDefaultRecipient,
      changeMatchedNames: this.props.changeMatchedNames,
      getRecipientName: recipient => (this.getRecipientName(recipient)),
      getMatcherContactList: this.props.getMatcherContactList,
    };
  }

  componentDidMount() {
    this.loadConversation();
  }

  componentWillUnmount() {
    this.props.unloadConversation();
  }

  getRecipientName(recipient) {
    const phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
    if (phoneNumber && this.props.getMatcherContactName) {
      const matcherName = this.props.getMatcherContactName(phoneNumber);
      if (matcherName) {
        return matcherName;
      }
      return this.props.formatNumber(phoneNumber);
    }
    if (recipient.name) {
      return recipient.name;
    }
    return this.props.formatNumber(phoneNumber);
  }

  loadConversation() {
    const id = this.props.conversationId;
    this.props.loadConversationById(id);
  }

  render() {
    return (
      <ConversationPanel
        conversationId={this.props.conversationId}
        currentLocale={this.props.currentLocale}
        messages={this.props.messages}
        recipients={this.props.recipients}
        showSpinner={this.props.showSpinner}
        replyToReceivers={this.props.replyToReceivers}
        sendButtonDisabled={this.props.sendButtonDisabled}
      />
    );
  }
}

ConversationPage.propTypes = {
  conversationId: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  sendButtonDisabled: PropTypes.bool.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  messages: ConversationPanel.propTypes.messages,
  recipients: ConversationPanel.propTypes.recipients,
  replyToReceivers: PropTypes.func.isRequired,
  unloadConversation: PropTypes.func.isRequired,
  loadConversationById: PropTypes.func.isRequired,
  changeDefaultRecipient: PropTypes.func.isRequired,
  formatNumber: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  getMatcherContactName: PropTypes.func,
  getMatcherContactList: PropTypes.func,
  changeMatchedNames: PropTypes.func.isRequired,
};

ConversationPage.defaultProps = {
  getMatcherContactName: null,
  getMatcherContactList: () => [],
};

ConversationPage.childContextTypes = {
  formatPhone: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  getRecipientName: PropTypes.func.isRequired,
  changeDefaultRecipient: PropTypes.func.isRequired,
  changeMatchedNames: PropTypes.func.isRequired,
  getMatcherContactList: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  return ({
    currentLocale: props.locale.currentLocale,
    conversationId: props.params.conversationId,
    sendButtonDisabled: props.conversation.pushing,
    showSpinner: (
      !props.dateTimeFormat.ready ||
      (props.contactMatcher && !props.contactMatcher.ready) ||
      !props.conversation.ready ||
      !props.regionSettings.ready
    ),
    recipients: props.conversation.recipients,
    messages: props.conversation.messages,
  });
}

function mapDispatchToProps(dispatch, props) {
  let getMatcherContactName;
  let getMatcherContactList;
  if (props.contactMatcher && props.contactMatcher.ready) {
    getMatcherContactList = (phoneNumber) => {
      const matcherNames = props.contactMatcher.dataMapping[phoneNumber];
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(matcher =>
          `${matcher.name}|${matcher.phoneNumbers[0].phoneType}`
        );
      }
      return [];
    };

    getMatcherContactName = (phoneNumber) => {
      const matcherNames = getMatcherContactList(phoneNumber);
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.join('&');
      }
      return null;
    };
  }

  return {
    replyToReceivers: props.conversation.replyToReceivers,
    changeDefaultRecipient: props.conversation.changeDefaultRecipient,
    changeMatchedNames: props.conversation.changeMatchedNames,
    unloadConversation: () => props.conversation.unloadConversation(),
    loadConversationById: id => props.conversation.loadConversationById(id),
    formatDateTime: props.formatDateTime ||
    (utcTimestamp => props.dateTimeFormat.formatDateTime({
      utcTimestamp,
    })),
    formatNumber: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: props.regionSettings.areaCode,
      countryCode: props.regionSettings.countryCode,
    }),
    getMatcherContactName,
    getMatcherContactList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage);
