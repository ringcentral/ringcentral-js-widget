import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import Icon from '../../../../elements/Icon';
import FormatInfo from '../FormatInfo';

function Media({
  onLog,
  info,
  type,
}) {
  return (
    <div className={styles.mediaItem}>
      <Icon type={type} className={styles.media} />
      <FormatInfo {...info} className={styles.infoRect} />
      <Icon type="Unlogged" onClick={onLog} className={styles.icon} />
    </div>
  );
}

Media.propTypes = {
  onLog: PropTypes.func,
  info: PropTypes.object,
  type: PropTypes.string.isRequired,
};

Media.defaultProps = {
  onLog() {},
  info: {},
};

export default Media;
