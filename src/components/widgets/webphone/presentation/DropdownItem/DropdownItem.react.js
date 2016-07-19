import React from 'react';

import { dropdownItem } from '../../index.css';

const DropdownItem = (props) => (
  <li className={dropdownItem}>
    <div>{props.country}</div>
    <div>{props.value}</div>
    <div>{props.type}</div>
  </li>
);

DropdownItem.propTypes = {
  country: React.PropTypes.string,
  value: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default DropdownItem;
