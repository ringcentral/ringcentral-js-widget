import React, { Component } from 'react';
import PropTypes from 'prop-types';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';

import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import ConfirmRemoveModal from './ConfirmRemoveModal';
import i18n from './i18n';
import ParticipantItem from './ParticipantItem';
import styles from './styles.scss';

class ParticipantsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      detail: null,
    };

    this.onRemoveBtnClick = this::this.onRemoveBtnClick;
    this.onCancel = this::this.onCancel;
  }

  onRemoveBtnClick(participant) {
    this.setState(() => ({
      detail: participant,
      showModal: true,
    }));
  }

  onCancel() {
    this.setState({
      showModal: false,
      detail: null,
    });
  }

  render() {
    const {
      participants,
      currentLocale,
      removeFunc,
      onBackButtonClick,
    } = this.props;

    const { detail, showModal } = this.state;

    const backHeader = (<BackHeader
      className={styles.header}
      onBackClick={onBackButtonClick}
      backButton={<BackButton label={i18n.getString('conferenceCall', currentLocale)} />}
    />);

    return (
      <div className={styles.root}>
        {backHeader}
        <div className={styles.participantsListContainer}>
          <div className={styles.participantsCount}>
            {`${participants.length} ${i18n.getString('participants', currentLocale)}`}
          </div>
          <div className={styles.participantsList}>
            {
            participants.map((participant) => {
              const {
                avatarUrl,
                toUserName,
                partyNumber,
                calleeType,
                id,
              } = participant;
              let detail;

              if (calleeType === calleeTypes.contacts) {
                detail = toUserName;
              } else {
                detail = partyNumber;
              }
              return (
                <ParticipantItem
                  key={id}
                  avatarUrl={avatarUrl}
                  detail={detail}
                  currentLocale={currentLocale}
                  onRemove={() => this.onRemoveBtnClick(participant)}
                />
              );
            })
          }
          </div>
        </div>
        <ConfirmRemoveModal
          show={showModal}
          detail={detail}
          onCancel={this.onCancel}
          currentLocale={currentLocale}
          onRemove={
            () => removeFunc(detail && detail.id).then(this.onCancel)
          } />
      </div>
    );
  }
}


ParticipantsContainer.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  removeFunc: PropTypes.func,
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBackButtonClick: PropTypes.func,
};

ParticipantsContainer.defaultProps = {
  removeFunc: i => i,
  onBackButtonClick: i => i,
};

export default ParticipantsContainer;
