import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';
import RemoveButton from '../RemoveButton';
import ContactDropdownList from '../ContactDropdownList';
import i18n from './i18n';

function SelectedRecipientItem({
  phoneNumber,
  name = phoneNumber,
  onRemove,
}) {
  const className = phoneNumber.length > 5 ? styles.phoneNumber : styles.extension;
  return (
    <li className={className}>
      <span>{name}</span>
      <RemoveButton
        className={styles.removeReceiver}
        onClick={onRemove}
        visibility
      />
    </li>
  );
}

SelectedRecipientItem.propTypes = {
  name: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
SelectedRecipientItem.defaultProps = {
  name: undefined,
};

function SelectedRecipients({
  recipient,
  recipients,
  multiple,
  onRemove,
}) {
  if (multiple && recipients.length) {
    return (
      <ul className={styles.selectReceivers}>
        {
          recipients.map(item => (
            <SelectedRecipientItem
              key={item.phoneNumber}
              name={item.name}
              phoneNumber={item.phoneNumber}
              onRemove={() => onRemove(item.phoneNumber)}
            />
          ))
        }
      </ul>
    );
  } else if (!multiple && recipient) {
    return (
      <ul className={styles.selectReceivers}>
        <SelectedRecipientItem
          key={recipient.phoneNumber}
          name={recipient.name}
          phoneNumber={recipient.phoneNumber}
          onRemove={() => onRemove(recipient.phoneNumber)}
        />
      </ul>
    );
  }
  return null;
}

SelectedRecipients.propTypes = {
  onRemove: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  recipients: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
  multiple: PropTypes.bool.isRequired,
};
SelectedRecipients.defaultProps = {
  recipient: null,
};

class RecipientsInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isFocusOnInput: false,
      selectedContactIndex: 0,
      scrollDirection: null,
    };

    this.setSelectedIndex = (index) => {
      this.setState({
        selectedContactIndex: index,
        scrollDirection: null,
      });
    };
    this.scrollOperation = (direction) => {
      if (direction === 'ArrowDown' || direction === 'ArrowUp') {
        this.setState({
          scrollDirection: direction,
        });
      }
    };
    this.addSelectedContactIndex = () => {
      const { length } = this.props.searchContactList;
      if (this.state.selectedContactIndex >= (length - 1)) {
        this.setState({
          selectedContactIndex: length - 1,
        });
      } else {
        this.setState(preState => ({
          selectedContactIndex: (preState.selectedContactIndex + 1),
        }));
      }
    };

    this.reduceSelectedContactIndex = () => {
      if (this.state.selectedContactIndex > 0) {
        this.setState(preState => ({
          selectedContactIndex: (preState.selectedContactIndex - 1),
        }));
      } else {
        this.setState({
          selectedContactIndex: 0,
        });
      }
    };

    this.isSplitter = (e) => {
      if (
        e.key === ',' || e.key === ';' || e.key === 'Enter' ||
        (e.key === 'Unidentified' && // for Safari (FF cannot rely on keyCode...)
          (e.keyCode === 186 || // semicolon
            e.keyCode === 188 || // comma
            e.keyCode === 13)) // enter
      ) {
        return true;
      }
      return false;
    };
    // using React SyntheticEvent to deal with cross browser issue
    this.handleHotKey = (e: React.KeyboardEvent) => {
      if (this.state.isFocusOnInput && this.state.value.length >= 3) {
        if (e.key === 'ArrowUp') {
          this.reduceSelectedContactIndex();
          this.scrollOperation(e.key);
        } else if (e.key === 'ArrowDown') {
          this.addSelectedContactIndex();
          this.scrollOperation(e.key);
        }
      } else {
        this.setState({
          selectedContactIndex: 0,
        });
      }
      if (this.isSplitter(e)) {
        e.preventDefault();
        if (this.state.value.length === 0) {
          return;
        }
        const relatedContactList = this.state.value.length >= 3 ?
          this.props.searchContactList : [];
        const currentSelected
          = relatedContactList[this.state.selectedContactIndex];
        if (currentSelected && e.key === 'Enter') {
          this.props.addToRecipients({
            name: currentSelected.name,
            phoneNumber: currentSelected.phoneNumber,
          });
        } else {
          this.props.addToRecipients({
            name: this.state.value.replace(',', ''),
            phoneNumber: this.state.value.replace(',', ''),
          });
          this.onClean();
        }
        this.onClean();
      }
    };
  }

  onInputKeyUp = (e) => {
    this.props.searchContact(e.currentTarget.value);
    this.setState({
      isFocusOnInput: true
    });
  }

  onInputFocus = () => {
    this.setState({
      isFocusOnInput: true
    });
  }

  onInputChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ value });
    this.props.onChange(value);
  }

  onClean = () => {
    this.setState({ value: '' });
    this.props.onClean();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
      this.props.searchContact(nextProps.value);
    }
  }

  componentDidMount() {
    this.props.searchContact(this.props.value);
    window.addEventListener('click', this.clickHandler);
    if (this.props.autoFocus) {
      this._focusTimeout = setTimeout(() => {
        if (this.inputRef) {
          this.inputRef.focus();
        }
      }, 300);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickHandler);
  }

  clickHandler = (evt) => {
    if (this.listRef && this.listRef.contains(evt.target)) return;
    if (this.inputRef && this.inputRef.contains(evt.target)) return;
    this.setState({
      isFocusOnInput: false
    });
  }

  _addToRecipients = (item) => {
    this.setState({ value: '', isFocusOnInput: false });
    this.props.addToRecipients(item);
  }

  render() {
    // TODO a temporary fix for rendering slower search result.
    const relatedContactList = this.state.value.length >= 3 ?
      this.props.searchContactList.slice(0, 50) : [];
    const label = (
      <label>
        {
          this.props.label ||
          i18n.getString('to', this.props.currentLocale)
        }
      :
      </label>
    );
    const toNumberInput = !this.props.multiple && this.props.recipient ?
      null :
      (
        <div>
          <div className={styles.inputField}>
            <input
              ref={(ref) => { this.inputRef = ref; }}
              name="receiver"
              value={this.state.value}
              onChange={this.onInputChange}
              className={styles.numberInput}
              maxLength={30}
              onFocus={this.onInputFocus}
              onKeyUp={this.onInputKeyUp}
              placeholder={
                this.props.placeholder ||
                i18n.getString('enterNameOrNumber', this.props.currentLocale)
              }
              autoComplete="off"
            />
          </div>
          <RemoveButton
            className={styles.removeButton}
            onClick={this.onClean}
            visibility={
              this.state.value.length > 0 &&
              this.state.isFocusOnInput
            }
          />
        </div>
      );

    return (
      <div
        className={classnames(styles.container, this.props.className)}
        onKeyDown={this.handleHotKey}
      >
        {label}
        <div className={styles.rightPanel}>
          <SelectedRecipients
            recipient={this.props.recipient}
            recipients={this.props.recipients}
            multiple={this.props.multiple}
            onRemove={this.props.removeFromRecipients}
          />
          {toNumberInput}
        </div>
        <ContactDropdownList
          listRef={(ref) => { this.listRef = ref; }}
          phoneTypeRenderer={this.props.phoneTypeRenderer}
          scrollDirection={this.state.scrollDirection}
          selectedIndex={this.state.selectedContactIndex}
          setSelectedIndex={this.setSelectedIndex}
          addToRecipients={this._addToRecipients}
          items={relatedContactList}
          formatContactPhone={this.props.formatContactPhone}
          visibility={this.state.isFocusOnInput}
          titleEnabled={this.props.titleEnabled}
        />
      </div>
    );
  }
}

RecipientsInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  searchContactList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  recipient: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  recipients: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  })),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClean: PropTypes.func.isRequired,
  addToRecipients: PropTypes.func.isRequired,
  removeFromRecipients: PropTypes.func.isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  searchContact: PropTypes.func,
  titleEnabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  currentLocale: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  phoneTypeRenderer: PropTypes.func,
};

RecipientsInput.defaultProps = {
  className: undefined,
  label: undefined,
  placeholder: undefined,
  recipient: null,
  recipients: [],
  searchContact: () => null,
  titleEnabled: undefined,
  autoFocus: false,
  multiple: false,
  phoneTypeRenderer: undefined,
};

export default RecipientsInput;
