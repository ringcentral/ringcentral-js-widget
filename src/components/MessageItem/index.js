import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import classnames from 'classnames';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

export default function MessageItem(props) {
  let className = null;
  if (props.unreadCounts > 0) {
    className = classnames(styles.messageItem, styles.unRead);
  } else {
    className = styles.messageItem;
  }
  return (
    <div className={className}>
      <Link
        to={`/conversations/${props.conversationId}`}
        className={styles.messageLink}
      >
        <div className={styles.typeIcon}>
          <span className={dynamicsFont.iconMessage} />
        </div>
        <div className={styles.messageContent}>
          <div className={styles.messageFrom}>
            {props.contactList.join(',')}
          </div>
          <div className={styles.messageText}>{props.subject}</div>
          <div className={styles.messageInfo}>
            <div className={styles.messageTime}>{props.formatDateTime(props.creationTime)}</div>
          </div>
        </div>
      </Link>
      <Link
        to={'/messages'}
        className={styles.messageLink}
      >
        <div className={styles.contactInfo}>
          <span className={dynamicsFont.information} />
        </div>
      </Link>
    </div>
  );
}

MessageItem.propTypes = {
  type: PropTypes.string.isRequired,
  unreadCounts: PropTypes.number,
  conversationId: PropTypes.string.isRequired,
  subject: PropTypes.string,
  contactList: PropTypes.arrayOf(PropTypes.string).isRequired,
  creationTime: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func.isRequired,
};

MessageItem.defaultProps = {
  unreadCounts: 0,
  subject: '',
};
