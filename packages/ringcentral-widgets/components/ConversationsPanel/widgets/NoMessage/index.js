
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

export default function NoMessages({ placeholder }) {
  return (
    <p className={styles.noMessages}>{placeholder}</p>
  );
}

NoMessages.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
