import React from 'react';
import { List, ListItem } from '../../../../commons/list/';

import { flip, flipTitle, flipItem, flipItemTitle, flipItemSubtitle } from './Flip.css';

const Flip = (props) => (
  <div className={flip}>
    <div className={flipTitle}>Flip to</div>
    <List>
      {
        props.numbers.map((number, index) => (
          <ListItem
            className={flipItem}
            key={index}
            onClick={() => props.flip(number.flipNumber)}
            clickable
          >
            <div className={flipItemTitle}>{number.phoneNumber}</div>
            <div className={flipItemSubtitle}>{number.label}</div>
          </ListItem>
        ))
      }
    </List>
  </div>
);

Flip.propTypes = {
  flipNumbers: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
  })),
  flip: React.PropTypes.object,
};

Flip.defaultProps = {
  numbers: [],
};


export default Flip;
