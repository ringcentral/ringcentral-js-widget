import React from 'react';
import WebPhone from '../../components/widgets/webphone/presentation/WebPhone.react.js';
import DialPad from '../../components/widgets/webphone/presentation/DialPad/DialPad.react.js';
import ActiveCall from '../../components/widgets/webphone/presentation/ActiveCall/ActiveCall.react.js';
import IncomingCall from '../../components/widgets/webphone/presentation/IncomingCall/IncomingCall.react.js';
import Dialer from '../../components/widgets/webphone/presentation/Dialer/Dialer.react.js';
import UserCallerBar from '../../components/widgets/webphone/container/UserCallerBar.react.js';
import UserFlip from '../../components/widgets/webphone/container/UserFlip.react.js';
import UserTransfer from '../../components/widgets/webphone/container/UserTransfer.react.js';
import CallConsole from '../../components/widgets/webphone/presentation/CallConsole/CallConsole.react.js';
import CallInfo from '../../components/widgets/webphone/presentation/CallInfo/CallInfo.react.js';
import CallFooter from '../../components/widgets/webphone/presentation/CallFooter/CallFooter.react.js';
import Closable from '../../components/widgets/webphone/presentation/Closable/Closable.react.js';
import CallerBar from '../../components/widgets/webphone/presentation/CallerBar/CallerBar.react.js';
import Flip from '../../components/widgets/webphone/presentation/Flip/Flip.react.js';
import Transfer from '../../components/widgets/webphone/presentation/Transfer/Transfer.react.js';
import Dropdown from '../../components/widgets/webphone/presentation/Dropdown/Dropdown.react.js';
import DropdownItem from '../../components/widgets/webphone/presentation/DropdownItem/DropdownItem.react.js';

import styles from './app.css';

const App = function App(props) {
  return (
    <div>
      <div className={styles.line}>
        <div className={styles.container}>
          <h1>WebPhone</h1>
          <div className={styles.app}>
            <WebPhone />
          </div>
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.container}>
          <h1>DialPad</h1>
          <div className={styles.app}>
            <DialPad />
          </div>
        </div>
        <div className={styles.container}>
          <h1>ActiveCall</h1>
          <div className={styles.app}>
            <ActiveCall />
          </div>
        </div>
        <div className={styles.container}>
          <h1>IncomingCall</h1>
          <div className={styles.app}>
            <IncomingCall />
          </div>
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.container}>
          <h1>Dialer</h1>
          <div className={styles.app}>
            <Dialer />
          </div>
        </div>
        <div className={styles.container}>
          <h1>UserCallerBar</h1>
          <div className={styles.app}>
            <UserCallerBar />
          </div>
        </div>
        <div className={styles.container}>
          <h1>UserFlip</h1>
          <div className={styles.app}>
            <UserFlip />
          </div>
        </div>
        <div className={styles.container}>
          <h1>UserTransfer</h1>
          <div className={styles.app}>
            <UserTransfer />
          </div>
        </div>
        <div className={styles.container}>
          <h1>CallConsole</h1>
          <div className={styles.app}>
            <CallConsole />
          </div>
        </div>
        <div className={styles.container}>
          <h1>Dialer</h1>
          <div className={styles.app}>
            <Dialer />
          </div>
        </div>
        <div className={styles.container}>
          <h1>CallInfo</h1>
          <div className={styles.app}>
            <CallInfo />
          </div>
        </div>
        <div className={styles.container}>
          <h1>CallFooter</h1>
          <div className={styles.app}>
            <CallFooter />
          </div>
        </div>
        <div className={styles.container}>
          <h1>Closable</h1>
          <div className={styles.app}>
            <Closable />
          </div>
        </div>
        <div className={styles.container}>
          <h1>CallFooter</h1>
          <div className={styles.app}>
            <CallFooter />
          </div>
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.container}>
          <h1>CallerBar</h1>
          <div className={styles.app}>
            <CallerBar />
          </div>
        </div>
        <div className={styles.container}>
          <h1>Flip</h1>
          <div className={styles.app}>
            <Flip />
          </div>
        </div>
        <div className={styles.container}>
          <h1>Transfer</h1>
          <div className={styles.app}>
            <Transfer />
          </div>
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.container}>
          <h1>Dropdown</h1>
          <div className={styles.app}>
            <Dropdown />
          </div>
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.container}>
          <h1>DropdownItem</h1>
          <div className={styles.app}>
            <DropdownItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
