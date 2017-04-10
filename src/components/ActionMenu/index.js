import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Spinner from '../Spinner';
import SlideMenu from '../SlideMenu';
import Button from '../Button';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';


function ClickToDialButton({
  className,
  currentLocale,
  onClickToDial,
  disableLinks,
  disableClickToDial,
  phoneNumber,
}) {
  return (
    <Button
      className={classnames(styles.call, className)}
      onClick={onClickToDial}
      disabled={disableLinks || disableClickToDial || !phoneNumber} >
      <span className={dynamicsFont.call} />
    </Button>
  );
}
ClickToDialButton.propTypes = {
  className: PropTypes.string,
  onClickToDial: PropTypes.func,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  phoneNumber: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
};
ClickToDialButton.defaultProps = {
  className: undefined,
  onClickToDial: undefined,
  disableLinks: false,
  disableClickToDial: false,
  phoneNumber: undefined,
};

function ClickToSmsButton({
  className,
  currentLocale,
  onClickToSms,
  disableLinks,
  phoneNumber,
}) {
  return (
    <Button
      className={classnames(styles.sms, className)}
      onClick={onClickToSms}
      disabled={disableLinks || !phoneNumber} >
      <span className={dynamicsFont.composeText} />
    </Button>
  );
}
ClickToSmsButton.propTypes = {
  className: PropTypes.string,
  onClickToSms: PropTypes.func,
  disableLinks: PropTypes.bool,
  phoneNumber: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
};
ClickToSmsButton.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
};

function LogButton({
  className,
  currentLocale,
  onLogCall,
  isLogged,
  disableLinks,
  isLogging,
}) {
  const spinner = isLogging ?
    (
      <div className={styles.spinnerContainer}>
        <Spinner ringWidth={2} />
      </div>
    ) :
    null;
  return (
    <Button
      className={classnames(styles.log, className)}
      onClick={onLogCall}
      disabled={disableLinks || isLogging}
    >
      <span
        className={isLogged ?
          dynamicsFont.edit :
          dynamicsFont.callLog
        } />
      {spinner}
    </Button>
  );
}
LogButton.propTypes = {
  className: PropTypes.string,
  onLogCall: PropTypes.func,
  isLogged: PropTypes.bool,
  disableLinks: PropTypes.bool,
  isLogging: PropTypes.bool,
  currentLocale: PropTypes.string.isRequired,
};
LogButton.defaultProps = {
  className: undefined,
  onLogCall: undefined,
  isLogged: false,
  disableLinks: false,
  isLogging: false,
};

function EntityButton({
  className,
  currentLocale,
  onViewEntity,
  onCreateEntity,
  hasEntity,
  disableLinks,
}) {
  return (
    <Button
      className={classnames(styles.entity, className)}
      onClick={onViewEntity}
      disabled={disableLinks} >

      <i className={dynamicsFont.record} />
    </Button>
  );
}
EntityButton.propTypes = {
  className: PropTypes.string,
  onViewEntity: PropTypes.func,
  onCreateEntity: PropTypes.func,
  hasEntity: PropTypes.bool,
  disableLinks: PropTypes.bool,
  currentLocale: PropTypes.string.isRequired,
};
EntityButton.defaultProps = {
  className: undefined,
  onViewEntity: undefined,
  hasEntity: false,
  onCreateEntity: undefined,
  disableLinks: false,
};

export default function ActionMenu({
  className,
  currentLocale,
  onLogCall,
  isLogged,
  isLogging,
  onViewEntity,
  onCreateEntity,
  hasEntity,
  onClickToDial,
  onClickToSms,
  phoneNumber,
  disableLinks,
  disableClickToDial,
 }) {
  const logButton = onLogCall ?
    (
      <LogButton
        className={styles.baseGroup}
        onLogCall={onLogCall}
        disableLinks={disableLinks}
        isLogged={isLogged}
        isLogging={isLogging}
        currentLocale={currentLocale}
      />
    ) :
    null;
  const entityButton = hasEntity && onViewEntity ?
    (
      <EntityButton
        className={styles.baseGroup}
        onViewEntity={onViewEntity}
        onCreateEntity={onCreateEntity}
        hasEntity={hasEntity}
        disableLinks={disableLinks}
        currentLocale={currentLocale}
      />
    ) :
    null;
  const hasBaseGroup = !!(logButton || entityButton);

  const clickToDialButton = onClickToDial ?
    (
      <ClickToDialButton
        className={hasBaseGroup ? styles.secondGroup : styles.baseGroup}
        onClickToDial={onClickToDial}
        phoneNumber={phoneNumber}
        disableLinks={disableLinks}
        disableClickToDial={disableClickToDial}
        currentLocale={currentLocale}
      />
    ) :
    null;
  const clickToSmsButton = onClickToSms ?
    (
      <ClickToSmsButton
        className={hasBaseGroup ? styles.secondGroup : styles.baseGroup}
        onClickToSms={onClickToSms}
        phoneNumber={phoneNumber}
        disableLinks={disableLinks}
        currentLocale={currentLocale}
      />
    ) :
    null;
  const hasSecondGroup = hasBaseGroup && !!(clickToDialButton || clickToSmsButton);
  if (hasSecondGroup) {
    // slide menu
    return (
      <SlideMenu
        className={classnames(styles.root, className)}
        minWidth={40}
        maxWidth={75} >
        {clickToDialButton}
        {clickToSmsButton}
        {entityButton}
        {logButton}
      </SlideMenu>
    );
  } else if (
    !clickToDialButton &&
    !clickToSmsButton &&
    !entityButton &&
    !logButton
  ) {
    return null;
  }
  // no slide menu
  return (
    <div className={classnames(styles.root, className)}>
      {clickToDialButton}
      {clickToSmsButton}
      {entityButton}
      {logButton}
    </div>
  );
}

ActionMenu.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onLogCall: PropTypes.func,
  isLogged: PropTypes.bool,
  isLogging: PropTypes.bool,
  onViewEntity: PropTypes.func,
  onCreateEntity: PropTypes.func,
  hasEntity: PropTypes.bool,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  phoneNumber: PropTypes.string,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
};
ActionMenu.defaultProps = {
  className: undefined,
  onLogCall: undefined,
  isLogged: false,
  isLogging: false,
  onViewEntity: undefined,
  onCreateEntity: undefined,
  hasEntity: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  phoneNumber: undefined,
  disableLinks: false,
  disableClickToDial: false,
};
