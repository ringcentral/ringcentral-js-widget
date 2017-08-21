import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SlideMenu from '../SlideMenu';
import EntityButton from '../EntityButton';
import EntityModal from '../EntityModal';
import Button from '../Button';
import LogButton from '../LogButton';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

function ClickToDialButton({
  className,
  onClickToDial,
  disableLinks,
  disableClickToDial,
  phoneNumber,
  title,
}) {
  return (
    <Button
      className={classnames(styles.call, className)}
      onClick={onClickToDial}
      disabled={disableLinks || disableClickToDial || !phoneNumber} >
      <span
        className={dynamicsFont.call}
        title={title} />
    </Button>
  );
}
ClickToDialButton.propTypes = {
  className: PropTypes.string,
  onClickToDial: PropTypes.func,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  phoneNumber: PropTypes.string,
  title: PropTypes.string,
};
ClickToDialButton.defaultProps = {
  className: undefined,
  onClickToDial: undefined,
  disableLinks: false,
  disableClickToDial: false,
  phoneNumber: undefined,
  title: undefined,
};

function ClickToSmsButton({
  className,
  onClickToSms,
  disableLinks,
  phoneNumber,
  title,
}) {
  return (
    <Button
      className={classnames(styles.sms, className)}
      onClick={onClickToSms}
      disabled={disableLinks || !phoneNumber} >
      <span
        className={dynamicsFont.composeText}
        title={title}/>
    </Button>
  );
}
ClickToSmsButton.propTypes = {
  className: PropTypes.string,
  onClickToSms: PropTypes.func,
  disableLinks: PropTypes.bool,
  phoneNumber: PropTypes.string,
};
ClickToSmsButton.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
};

export default class ActionMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entityModalVisible: false,
    };
  }
  onCreateEnityModal = (entityType) => {
    this.props.onCreateEntity(entityType);
    this.closeEntityModal();
  }
  onCancelEntityModal = () => {
    this.closeEntityModal();
  }
  openEntityModal = () => {
    this.setState({
      entityModalVisible: true
    });
  }
  closeEntityModal = () => {
    this.setState({
      entityModalVisible: false
    });
  }
  captureClick = (e) => {
    // e.captureClick = this.props.captureClick;
    if (this.props.stopPropagation) {
      e.stopPropagation();
    }
  }

  render() {
    const {
      reference,
      className,
      currentLocale,
      onLog,
      isLogged,
      isLogging,
      isCreating,
      onViewEntity,
      onCreateEntity,
      hasEntity,
      onClickToDial,
      onClickToSms,
      phoneNumber,
      disableLinks,
      disableClickToDial,
      addLogTitle,
      editLogTitle,
      callTitle,
      textTitle,
      createEntityTitle,
      viewEntityTitle,
    } = this.props;

    const logButton = onLog ?
      (
        <LogButton
          className={styles.baseGroup}
          onLog={onLog}
          disableLinks={disableLinks}
          isLogged={isLogged}
          isLogging={isLogging}
          currentLocale={currentLocale}
          addTitle={addLogTitle}
          editTitle={editLogTitle}
        />
      ) :
      null;

    let entityButton;
    if (hasEntity && onViewEntity) {
      entityButton = (<EntityButton
        className={classnames(styles.entity, styles.baseGroup)}
        onViewEntity={onViewEntity}
        hasEntity={hasEntity}
        disableLinks={disableLinks}
        viewEntityTitle={viewEntityTitle}
      />);
    } else if (!hasEntity && phoneNumber && onCreateEntity) {
      entityButton = (<EntityButton
        className={classnames(styles.entity, styles.baseGroup)}
        onCreateEntity={this.openEntityModal}
        hasEntity={hasEntity}
        disableLinks={disableLinks}
        createEntityTitle={createEntityTitle}
      />);
    } else {
      entityButton = null;
    }

    const entityModal = (!hasEntity && phoneNumber) ?
      (<EntityModal
        currentLocale={currentLocale}
        show={this.state.entityModalVisible}
        onCreate={this.onCreateEnityModal}
        onCancel={this.onCancelEntityModal}
      />
      ) : null;

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
          title={callTitle}
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
          title={textTitle}
        />
      ) :
      null;
    const hasSecondGroup = hasBaseGroup && !!(clickToDialButton || clickToSmsButton);
    if (hasSecondGroup) {
      // slide menu
      return (
        <div
          ref={reference}
          onClick={this.captureClick}>
          <SlideMenu
            className={classnames(styles.root, className)}
            minWidth={40}
            maxWidth={75} >
            {clickToDialButton}
            {clickToSmsButton}
            {entityButton}
            {logButton}
            {entityModal}
          </SlideMenu>
        </div>
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
      <div
        ref={reference}
        onClick={this.captureClick} >
        <div className={classnames(styles.root, className)}>
          {clickToDialButton}
          {clickToSmsButton}
          {entityButton}
          {logButton}
          {entityModal}
        </div>
      </div>
    );
  }
}

ActionMenu.propTypes = {
  reference: PropTypes.func,
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onLog: PropTypes.func,
  isLogged: PropTypes.bool,
  isLogging: PropTypes.bool,
  isCreating: PropTypes.bool,
  onViewEntity: PropTypes.func,
  onCreateEntity: PropTypes.func,
  hasEntity: PropTypes.bool,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  phoneNumber: PropTypes.string,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  addLogTitle: PropTypes.string,
  editLogTitle: PropTypes.string,
  textTitle: PropTypes.string,
  callTitle: PropTypes.string,
  createEntityTitle: PropTypes.string,
  viewEntityTitle: PropTypes.string,
};
ActionMenu.defaultProps = {
  reference: undefined,
  className: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  isCreating: false,
  onViewEntity: undefined,
  onCreateEntity: undefined,
  hasEntity: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  phoneNumber: undefined,
  disableLinks: false,
  disableClickToDial: false,
  stopPropagation: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  textTitle: undefined,
  callTitle: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
};
