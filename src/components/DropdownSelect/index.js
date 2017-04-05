import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

class DropdownSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.mounted = true;

    this.toggleShowDropdown = () => {
      if (this.props.disabled) {
        return;
      }
      this.setState(preState => ({
        open: !preState.open,
      }));
    };

    this.onChange = (e, option) => {
      e.stopPropagation();
      this.props.onChange(option);
      this.toggleShowDropdown();
    };

    this._handleDocumentClick = (e) => {
      if (!this.mounted) {
        return;
      }
      if (this.wrapper && this.wrapper.contains(e.target)) {
        return;
      }
      if (this.dropdownMenu && this.dropdownMenu.contains(e.target)) {
        return;
      }
      this.setState({
        open: false,
      });
    };
  }

  componentDidMount() {
    this.mounted = true;
    window.addEventListener('click', this._handleDocumentClick, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.props.renderDropdownMenu && this.wrapper) {
        const menu = this.renderDropdownMenu();
        const buttomPosition = this.wrapper.getBoundingClientRect();
        this.props.renderDropdownMenu(menu, this.state.open, buttomPosition);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('click', this._handleDocumentClick, false);
  }

  renderDropdownMenu() {
    return (
      <ul className={styles.dropdown} ref={(ref) => { this.dropdownMenu = ref; }}>
        {
          this.props.options.map((option, idx) => {
            const currentValue = this.props.valueFunction(option, idx);
            const className = classnames(
              styles.dropdownItem,
              this.props.value === currentValue ? styles.selected : null,
            );
            return (
              <li
                key={currentValue}
                className={className}
                value={currentValue}
                onClick={e => this.onChange(e, option)}
              >
                {this.props.renderFunction(option, idx)}
              </li>
            );
          })
        }
      </ul>
    );
  }

  render() {
    const label = this.props.label ?
      (
        <label>
          {this.props.label}
        </label>
      ) : null;
    const iconClassName = classnames(
      styles.icon,
      this.state.open ? styles.iconUp : null,
    );
    const containerClassName = classnames(
      styles.root,
      this.props.className,
      this.props.disabled ? styles.disabled : null,
      this.state.open ? styles.open : null,
    );
    const dropdownMenu = this.props.renderDropdownMenu ?
      null :
      this.renderDropdownMenu();

    return (
      <div
        className={containerClassName}
        ref={(ref) => { this.wrapper = ref; }}
      >
        <button className={styles.button} onClick={this.toggleShowDropdown}>
          {label}
          <span className={styles.selectedValue}>
            {this.props.renderValue(this.props.value)}
          </span>
          <span className={iconClassName}>
            <i className={dynamicsFont.arrow} />
          </span>
        </button>
        { dropdownMenu }
      </div>
    );
  }
}

DropdownSelect.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  valueFunction: PropTypes.func,
  renderFunction: PropTypes.func,
  renderValue: PropTypes.func,
  renderDropdownMenu: PropTypes.func,
};

DropdownSelect.defaultProps = {
  className: null,
  value: null,
  label: null,
  onChange: undefined,
  disabled: false,
  renderDropdownMenu: undefined,
  valueFunction: option => option,
  renderFunction: option => option,
  renderValue: option => option,
};

export default DropdownSelect;
