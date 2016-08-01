import React from 'react';
import classNames from 'classnames';

import { PanelHeader, PanelContent, PanelFooter } from '../../../../commons/panel/';
import { Input } from '../../../../commons/autocomplete/';

import Dialer from '../Dialer/Dialer.react';
import CallerBar from '../CallerBar/CallerBar.react';

import { main, container, line } from '../../index.css';
import { bar, callButton, phoneInput } from './DialPad.css';
import iconsStyles from '../../../../../styles/icon.css';

export default class DialPad extends React.Component {
  static propTypes = {
    contacts: React.PropTypes.object,
    userNumbers: React.PropTypes.array,
    call: React.PropTypes.func,
    remoteMedia: React.PropTypes.any,
    localMedia: React.PropTypes.any,
    getString: React.PropTypes.func,
  }

  state = {
    dialingNumber: '',
    caller: this.props.userNumbers[0],
  }

  componentWillMount() {
    if (this.props.userNumbers[0]) {
      this.setDefaultCaller(this.props.userNumbers);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.caller && nextProps.userNumbers[0]) {
      this.setDefaultCaller(nextProps.userNumbers);
    }
  }

  setDefaultCaller(numbers) {
    this.setState({ caller: numbers[0] });
  }

  handleChange(event) {
    this.dial(event.target.value);
  }

  handleClick(number) {
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(number) > -1) {
      this.dial(this.state.dialingNumber + number);
    }
  }

  handleCallClick(event) {
    console.log(this.state.caller.phoneNumber)
    // TODO: validate dialingNumber
    this.props.call({
      toNumber: this.state.dialingNumber,
      fromNumber: this.state.caller.phoneNumber,
      media: {
        remote: this.props.remoteMedia,
        local: this.props.localMedia,
      },
    });
  }

  dial(dialingNumber) {
    this.setState({ dialingNumber });
  }

  caller(caller) {
    this.setState({ caller });
  }

  render() {
    return (
      <div className={classNames(main, container)}>
        <div className={bar}>
          <CallerBar
            setCaller={(number) => this.caller(number)}
            caller={this.state.caller}
            numbers={this.props.userNumbers}
            getString={this.props.getString}
          />
        </div>
        <PanelContent>
          <div>
            <Input
              className={phoneInput}
              onChange={(event) => this.handleChange(event)}
              value={this.state.dialingNumber}
              items={this.props.contacts}
            />
            <div>
              <Dialer handleClick={(number) => this.handleClick(number)} />
            </div>
          </div>
        </PanelContent>
        <PanelFooter>
          <div className={line}>
            <button
              className={callButton}
              onClick={(event) => this.handleCallClick(event)}
            >
              <span className={classNames(iconsStyles['icon-uniAE'], iconsStyles.icon)}></span>
            </button>
          </div>
        </PanelFooter>
      </div>
    );
  }
}
