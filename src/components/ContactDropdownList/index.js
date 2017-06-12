import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import phoneTypeNames from '../../lib/phoneTypeNames';
import phoneSourceNames from '../../lib/phoneSourceNames';

function ContactItem(props) {
  const className = classnames(
    styles.contactItem,
    props.active ? styles.active : null,
  );
  const spliter = '|';
  const phoneTypeName = phoneTypeNames.getString(props.phoneType);
  const phoneSourceName = phoneSourceNames.getString(props.entityType);
  const nameTitle = `${props.name} ${spliter} ${phoneSourceName}`;
  const phoneNumberTitle =
    `${props.formatContactPhone(props.phoneNumber)} ${spliter} ${phoneTypeName}`;

  return (
    <li className={className} onMouseOver={props.onHover}>
      <div className={styles.clickable} onClick={props.onClick}>
        <div className={styles.nameSection} title={props.titleEnabled && nameTitle}>
          <span className={styles.name}>
            {props.name}
          </span>
          <span className={styles.spliter}>{spliter}</span>
          <span className={styles.label}>
            {phoneSourceName}
          </span>
        </div>
        <div className={styles.phoneNumberSection} title={props.titleEnabled && phoneNumberTitle}>
          <span>
            {props.formatContactPhone(props.phoneNumber)}
          </span>
          <span className={styles.spliter}>{spliter}</span>
          <span className={styles.label}>
            {phoneTypeName}
          </span>
        </div>
      </div>
    </li>
  );
}

ContactItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  phoneType: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  titleEnabled: PropTypes.bool,
};
ContactItem.defaultProps = {
  titleEnabled: undefined,
};

class ContactDropdownList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.visibility) {
      if (nextProps.scrollDirection === 'ArrowDown') {
        if (nextProps.selectedIndex < nextProps.items.length) {
          if (nextProps.selectedIndex > 4) {
            this.node.scrollTop += 53;
            this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
          }
        }
      }
      if (nextProps.scrollDirection === 'ArrowUp') {
        if (nextProps.selectedIndex > -1) {
          if (nextProps.selectedIndex < nextProps.items.length - 4) {
            this.node.scrollTop -= 53;
            this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
          }
        }
      }
    }
  }
  render() {
    const props = this.props;
    const items = props.items;
    let listClassName = null;
    let hiddenClassName = null;
    if (items.length === 0) {
      hiddenClassName = styles.hidden;
    }
    listClassName = classnames(styles.dropdownList, props.className, hiddenClassName);

    return (
      <ul className={listClassName} ref={(c) => { this.node = c; }}>
        {
          items.map((item, index) => (
            <ContactItem
              active={props.selectedIndex === index}
              name={item.name}
              entityType={item.entityType}
              phoneType={item.phoneType}
              phoneNumber={item.phoneNumber}
              formatContactPhone={props.formatContactPhone}
              onHover={() => props.setSelectedIndex(index)}
              onClick={() => props.addToRecipients({
                name: item.name,
                phoneNumber: item.phoneNumber,
              })}
              key={`${index}${item.phoneNumber}${item.name}${item.phoneType}`}
              titleEnabled={props.titleEnabled}
            />
          ))
        }
      </ul>
    );
  }
}

ContactDropdownList.propTypes = {
  scrollDirection: PropTypes.string,
  visibility: PropTypes.bool.isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  addToRecipients: PropTypes.func.isRequired,
  setSelectedIndex: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  titleEnabled: PropTypes.bool,
};

ContactDropdownList.defaultProps = {
  className: null,
  scrollDirection: null,
  titleEnabled: undefined,
};

export default ContactDropdownList;
