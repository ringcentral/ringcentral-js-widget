import React from 'react';
import classNames from 'classnames';

import { Ratio } from '../../../../commons/ratio/';

import Flip from '../Flip/Flip.react';
import Transfer from '../Transfer/Transfer.react';
import CallConsole from '../CallConsole/CallConsole.react';
import Dialer from '../Dialer/Dialer.react';
import CallInfo from '../CallInfo/CallInfo.react';
import CallFooter from '../CallFooter/CallFooter.react';
import Closeable from '../Closable/Closable.react';

import { main, container } from '../../index.css';

let durationInterval;

export default class ActiveCall extends React.Component {

  static propTypes = {
    enums: React.PropTypes.object,
    phoneNumber: React.PropTypes.string,
    flipNumbers: React.PropTypes.array,
    bye: React.PropTypes.func,
    flip: React.PropTypes.func,
    transfer: React.PropTypes.func,
    park: React.PropTypes.func,
    record: React.PropTypes.func,
    hold: React.PropTypes.func,
    mute: React.PropTypes.func,
    dtmf: React.PropTypes.func,
    disabledOperation: React.PropTypes.array,
    operationStatus: React.PropTypes.array,
    webphoneStatus: React.PropTypes.string,
  }

  state = {
    openedPanel: null,
    duration: 0,
  }

  componentWillMount() {
    this.enums = this.props.enums;
  }

  componentDidMount() {
    if (this.props.webphoneStatus === this.enums.webphoneStatus.callConnected) {
      this.startToCountDuration();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.webphoneStatus === 'CALL_CONNECTED' &&
        this.props.webphoneStatus === 'CALL_CONNECTING') {
      this.startToCountDuration();
    }
  }

  componentWillUnmount() {
    if (durationInterval) {
      window.clearInterval(durationInterval);
      durationInterval = null;
    }
  }

  startToCountDuration() {
    durationInterval = window.setInterval(
      () => this.setState({ duration: this.state.duration + 1 }),
      1000
    );
  }

  render() {
    function contain(arr, target) {
      return arr && target && arr.indexOf(target) !== -1;
    }
    const content = () => {
      if (this.state.openedPanel === 'keypad') {
        return (
          <div className={classNames(main, container)}>
            <CallInfo phoneNumber={this.props.phoneNumber} duration={this.state.duration} />
            <Ratio size={0.9}>
              <Dialer handleClick={(number) => this.props.dtmf(number)} />
            </Ratio>
            <CallFooter
              leftIcon={'icon-uni40'}
              rightIcon={'icon-uni44'}
              onLeftClick={() => this.setState({ openedPanel: null })}
              onRightClick={() => {}}
            />
          </div>
        );
      } else if (this.state.openedPanel === 'flip') {
        return (
          <Closeable onClose={() => this.setState({ openedPanel: null })} className={main}>
            <Flip
              handleClick={(number) => this.props.flip(number)}
              numbers={this.props.flipNumbers}
            />
          </Closeable>
        );
      } else if (this.state.openedPanel === 'transfer') {
        return (
          <Closeable onClose={() => this.setState({ openedPanel: null })} className={main}>
            <Transfer handleClick={(number) => this.props.transfer(number)} />
          </Closeable>
        );
      }
      return (
        <div className={classNames(main, container)}>
          <CallInfo phoneNumber={this.props.phoneNumber} duration={this.state.duration} />
          <CallConsole
            status={this.props.operationStatus}
            disabledOperation={this.props.disabledOperation}
            disabled={this.props.webphoneStatus !== 'CALL_CONNECTED'}
            handleHoldClick={(flag) => this.props.hold(flag)}
            handleRecordClick={(flag) => this.props.record(flag)}
            handleKeypadClick={() => this.setState({ openedPanel: 'keypad' })}
            handleFlipClick={() => this.setState({ openedPanel: 'flip' })}
            handleTransferClick={() => this.setState({ openedPanel: 'transfer' })}
            handleParkClick={() => this.props.park()}
          />
          <CallFooter
            leftIcon={classNames({
              'icon-uniCE': !contain(this.props.operationStatus, 'MUTED'),
              'icon-uni7B': contain(this.props.operationStatus, 'MUTED'),
            })}
            rightIcon={'icon-uni44'}
            onLeftClick={() => this.props.mute(!contain(this.props.operationStatus, 'MUTED'))}
            onRightClick={() => this.props.bye()}
          />
        </div>
      );
    };

    return (
      <div className={main}>
        {content()}
      </div>
    );
  }
}
