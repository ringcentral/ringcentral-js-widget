import React from 'react';
import classNames from 'classnames';

import { PanelHeader, PanelContent, PanelFooter } from '../../../../commons/panel/';
import { Input } from '../../../../commons/autocomplete/';

import Dialer from '../Dialer/Dialer.react';
import UserCallerBar from '../../container/UserCallerBar.react';

import { main, container, line } from '../../index.css';
import { bar, callButton, phoneInput } from './DialPad.css';
import iconsStyles from '../../../../../styles/icon.css';

export default class DialPad extends React.Component {
  static propTypes = {
    contacts: React.PropTypes.object,
    call: React.PropTypes.func,
  }

  state = {
    dialingNumber: '',
    caller: '',
  }

  handleInput(event) {
    this.dial(event.target.value);
  }

  handleClick(number) {
    this.dial(this.state.dialingNumber + number);
  }

  handleCallClick(event) {
    // TODO: validate dialingNumber
    console.log(this.state.dialingNumber);
    this.props.call({
      toNumber: this.state.dialingNumber,
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
          <UserCallerBar setCaller={(number) => this.caller(number)} />
        </div>
        <PanelContent>
          <div>
            <Input
              className={phoneInput}
              onChange={(event) => this.handleInput(event)}
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
