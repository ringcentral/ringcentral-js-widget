import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import i18n from './i18n';

const UIHeightOffset = 23;
// the extra height of the entire field with paddings and borders

export default class MessageInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    currentLocale: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    maxLength: PropTypes.number,
    onSend: PropTypes.func,
    onChange: PropTypes.func,
    onHeightChange: PropTypes.func,
    inputExpandable: PropTypes.bool,
  }
  static defaultProps = {
    disabled: false,
    onSend: undefined,
    onChange: undefined,
    onHeightChange: undefined,
    minHeight: 63,
    maxHeight: 300,
    maxLength: 5000,
    inputExpandable: true,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.value,
      height: props.minHeight,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      // use setState(updater, callback) to recaculate height after value has been update to DOM
      this.setState(
        () => ({
          value: nextProps.value,
        }),
        () => {
          const newHeight = this.calculateNewHeight();
          if (newHeight !== this.state.height) {
            if (typeof this.props.onHeightChange === 'function') {
              this.props.onHeightChange(newHeight);
            }
            this.setState({
              height: newHeight,
            });
          }
        }
      );
    }
  }
  componentDidMount() {
    // do a initial size check in case the component is mounted with multi line value
    const newHeight = this.calculateNewHeight();
    if (newHeight !== this.state.height) {
      if (typeof this.props.onHeightChange === 'function') {
        this.props.onHeightChange(newHeight);
      }
      this.setState({
        height: newHeight,
      });
    }
  }
  calculateNewHeight() {
    if (!this.props.inputExpandable) {
      return this.props.minHeight;
    }
    // temperarily set height to 0 to check scrollHeight
    this.textArea.style.height = 0;
    const newHeight = this.textArea.scrollHeight + 10 + UIHeightOffset;
    // set height back to original to avoid messing with react
    this.textArea.style.height = `${this.state.height - UIHeightOffset}px`;
    const {
      minHeight,
      maxHeight,
    } = this.props;
    if (newHeight < minHeight) {
      return minHeight;
    } else if (newHeight > maxHeight) {
      return maxHeight;
    }
    return newHeight;
  }
  onChange = (e) => {
    const {
      currentTarget: {
        value,
      },
    } = e;
    const newHeight = this.calculateNewHeight();
    if (newHeight !== this.state.height && typeof this.props.onHeightChange === 'function') {
      this.props.onHeightChange(newHeight);
    }
    this.setState({
      value,
      height: newHeight,
    });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  }
  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        if (typeof this.props.onSend === 'function') {
          this.props.onSend();
        }
      }
    }
  }
  render() {
    const {
      currentLocale,
      disabled,
      onSend,
      maxLength,
    } = this.props;
    const {
      value,
      height,
    } = this.state;
    const inputHeight = height - UIHeightOffset;
    return (
      <div className={styles.root}>
        <div className={styles.textField}>
          <textarea
            data-sign="messageInput"
            ref={(target) => { this.textArea = target; }}
            placeholder={i18n.getString('typeMessage', currentLocale)}
            value={value}
            maxLength={maxLength}
            onChange={this.onChange}
            onKeyPressCapture={this.onKeyDown}
            style={{
              height: inputHeight,
            }}
          />
        </div>
        <div className={styles.submitField}>
          <input
            data-sign="messageButton"
            type="button"
            value={i18n.getString('send', currentLocale)}
            onClick={onSend}
            className={styles.sendButton}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}
