import React, { PropTypes, Component } from 'react';
import messageSenderMessages from
'ringcentral-integration/modules/MessageSender/messageSenderMessages';
import i18n from './i18n';
import styles from './styles.scss';
import RecipientsInput from '../RecipientsInput';
import AlertDisplay from '../AlertDisplay';
import MessageSenderAlert from '../MessageSenderAlert';
import Select from '../Select';

function SenderField(props) {
  return (
    <div>
      <label>{i18n.getString('from', props.currentLocale)}:</label>
      <div className={styles.senderInput}>
        <Select
          className={styles.senderSelect}
          value={props.value}
          onChange={props.onChange}
          options={props.options}
          paddingLeft={0}
          valueFunction={option => option}
          renderFunction={props.formatPhone}
        />
      </div>
    </div>
  );
}

SenderField.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

class ComposeTextPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: !this.hasSenderNumbers() && !this.props.internalSMS,
    };

    this.onSenderChange = (e) => {
      const value = e.currentTarget.value;
      this.props.updateSenderNumber(value);
    };

    this.onReceiverChange = (e) => {
      const value = e.currentTarget.value;
      this.props.updateTypingToNumber(value);
    };

    this.cleanReceiverValue = () => {
      this.props.cleanTypingToNumber();
    };

    this.onReceiverInputKeyDown = (e) => {
      if (e.key === ',' || e.key === ';' || e.key === 'Enter') {
        e.preventDefault();
        if (this.props.typingToNumber.length === 0) {
          return;
        }
        this.props.addToNumber({
          name: this.props.typingToNumber,
          phoneNumber: this.props.typingToNumber,
        });
        this.props.cleanTypingToNumber();
      }
    };

    this.onReceiverInputKeyUp = (e) => {
      this.props.searchContact(e.currentTarget.value);
    };

    this.addToRecipients = (receiver) => {
      this.props.addToNumber(receiver);
      this.props.cleanTypingToNumber();
    };

    this.removeFromRecipients = (phoneNumber) => {
      this.props.removeToNumber({ phoneNumber });
    };

    this.onTextChange = (e) => {
      const value = e.currentTarget.value;
      this.props.updateMessageText(value);
    };

    this.onTextAreaKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.props.send();
      }
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      this.props.send();
      console.debug('send message ...');
    };
    this.onDismissAlert = () => {
      this.setState({
        showAlert: false
      });
    };
    this.getRenderer = () => MessageSenderAlert;
    this.messages = [
      {
        id: '1',
        level: 'warning',
        message: messageSenderMessages.senderNumberInvalids,
      }
    ];
  }

  hasSenderNumbers() {
    return this.props.senderNumbers.length > 0;
  }

  render() {
    const noSenderAlert = this.state.showAlert ? (
      <AlertDisplay
        currentLocale={this.props.currentLocale}
        messages={this.messages}
        dismiss={this.onDismissAlert}
        getRenderer={this.getRenderer}
      />
    ) : null;
    const senderField = this.hasSenderNumbers() ?
      (
        <SenderField
          currentLocale={this.props.currentLocale}
          value={this.props.senderNumber}
          options={this.props.senderNumbers}
          formatPhone={this.props.formatPhone}
          onChange={this.onSenderChange}
        />
      ) : null;

    return (
      <div className={styles.root}>
        {noSenderAlert}
        <form onSubmit={this.handleSubmit}>
          <div className={styles.receiverField}>
            <RecipientsInput
              value={this.props.typingToNumber}
              label={`${i18n.getString('to', this.props.currentLocale)}:`}
              onChange={this.onReceiverChange}
              onClean={this.cleanReceiverValue}
              placeholder={i18n.getString('enterNameOrNumber', this.props.currentLocale)}
              recipients={this.props.toNumbers}
              addToRecipients={this.addToRecipients}
              removeFromRecipients={this.removeFromRecipients}
              searchContactList={this.props.searchContactList}
              onKeyUp={this.onReceiverInputKeyUp}
              onKeyDown={this.onReceiverInputKeyDown}
              formatContactPhone={this.props.formatContactPhone}
            />
          </div>
          <div className={styles.senderField}>
            {senderField}
          </div>
          <div className={styles.buttomField}>
            <div className={styles.textField}>
              <textarea
                placeholder={i18n.getString('typeMessage', this.props.currentLocale)}
                value={this.props.messageText}
                maxLength="1000"
                onChange={this.onTextChange}
                onKeyDown={this.onTextAreaKeyDown}
              />
            </div>
            <div className={styles.submitField}>
              <input
                type="submit"
                value={i18n.getString('send', this.props.currentLocale)}
                className={styles.submitButton}
                disabled={this.props.sendButtonDisabled}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ComposeTextPanel.propTypes = {
  send: PropTypes.func.isRequired,
  senderNumbers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  sendButtonDisabled: PropTypes.bool.isRequired,
  formatPhone: PropTypes.func.isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  searchContact: PropTypes.func.isRequired,
  searchContactList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  currentLocale: PropTypes.string.isRequired,
  updateSenderNumber: PropTypes.func.isRequired,
  updateTypingToNumber: PropTypes.func.isRequired,
  cleanTypingToNumber: PropTypes.func.isRequired,
  addToNumber: PropTypes.func.isRequired,
  removeToNumber: PropTypes.func.isRequired,
  updateMessageText: PropTypes.func.isRequired,
  messageText: PropTypes.string,
  typingToNumber: PropTypes.string,
  senderNumber: PropTypes.string,
  toNumbers: React.PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

ComposeTextPanel.defaultProps = {
  messageText: '',
  typingToNumber: '',
  senderNumber: '',
};

export default ComposeTextPanel;