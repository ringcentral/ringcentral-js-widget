import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

import ForwardForm from '../ForwardForm';
import ActiveCallButton from '../ActiveCallButton';
import MessageIcon from '../../assets/images/MessageFill.svg';
import ForwardIcon from '../../assets/images/Forward.svg';
import IgnoreIcon from '../../assets/images/Ignore.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import AnswerIcon from '../../assets/images/Answer.svg';
import styles from './styles.scss';

import i18n from './i18n';

export default class IncomingCallPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForward: false,
    };
    this.onShowForwardChange = (visible) => {
      this.setState({
        showForward: visible,
        forwardNumber: '',
      });
    };
    this.onForwardNumberChange = (forwardNumber) => {
      this.setState({ forwardNumber });
    };
    this.closeForwardForm = () => {
      this.onShowForwardChange(false);
    };
  }

  render() {
    const {
      currentLocale,
      reject,
      toVoiceMail,
      answer,
      forwardingNumbers,
      formatPhone,
    } = this.props;
    return (
      <div className={styles.root}>
        <div
          className={styles.forwardContainner}
          ref={(containner) => {
            this.forwardContainner = containner;
          }}
        />
        <div className={styles.buttonRow}>
          <Tooltip
            defaultVisible={false}
            visible={this.state.showForward}
            onVisibleChange={this.onShowForwardChange}
            placement="topRight"
            trigger="click"
            arrowContent={<div className="rc-tooltip-arrow-inner" />}
            getTooltipContainer={() => this.forwardContainner}
            overlay={
              <ForwardForm
                forwardingNumbers={forwardingNumbers}
                currentLocale={currentLocale}
                onCancel={this.closeForwardForm}
                formatPhone={formatPhone}
                value={this.state.forwardNumber}
                onChange={this.onForwardNumberChange}
                onForward={this.props.onForward}
              />
            }
          >
            <ActiveCallButton
              icon={ForwardIcon}
              onClick={() => null}
              title={i18n.getString('forward', currentLocale)}
              className={styles.callButton}
            />
          </Tooltip>
          <ActiveCallButton
            onClick={() => console.log('test')}
            icon={MessageIcon}
            title={i18n.getString('reply', currentLocale)}
            className={styles.callButton}
          />
          <ActiveCallButton
            onClick={reject}
            icon={IgnoreIcon}
            title={i18n.getString('ignore', currentLocale)}
            className={styles.callButton}
          />
        </div>
        <div className={styles.buttonRow}>
          <ActiveCallButton
            onClick={toVoiceMail}
            title={i18n.getString('toVoicemail', currentLocale)}
            buttonClassName={styles.rejectButton}
            icon={VoicemailIcon}
            showBorder={false}
            className={styles.bigCallButton}
          />
          <ActiveCallButton
            onClick={answer}
            title={i18n.getString('answer', currentLocale)}
            buttonClassName={styles.answerButton}
            icon={AnswerIcon}
            showBorder={false}
            className={styles.bigCallButton}
          />
        </div>
      </div>
    );
  }
}

IncomingCallPad.propTypes = {
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  toVoiceMail: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  forwardingNumbers: PropTypes.array.isRequired,
  formatPhone: PropTypes.func,
  onForward: PropTypes.func.isRequired,
};

IncomingCallPad.defaultProps = {
  formatPhone: phone => phone,
};
