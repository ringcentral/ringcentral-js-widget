import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Collapse from '../Collapse';
import styles from './styles.scss';

const STYLES_ITEMS = [
  {
    name: 'Colors',
    path: '/styles/colors',
  },
  {
    name: 'Buttons',
    path: '/styles/buttons',
  },
  {
    name: 'Dropdown',
    path: '/styles/dropdown',
  },
];
function ComponentList(props) {
  return (
    <ul>
      {props.components.map((component) => (
        <li key={component.name}>
          <Link to={`/components/${component.name}`}>{component.name}</Link>
        </li>
      ))}
    </ul>
  );
}

ComponentList.propTypes = {
  components: PropTypes.array.isRequired,
};

function SideBarView(props) {
  const navClassName = classnames(
    styles.navigation,
    props.fixed ? styles.fixed : null,
  );
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <div className={navClassName}>
          <ul>
            <li>
              <Link to="/">OverView</Link>
            </li>
            <li>
              <Collapse collapsed={false} button="Styles">
                <ul>
                  {STYLES_ITEMS.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </Collapse>
            </li>
            <li>
              <Collapse collapsed={false} button="Components">
                <ComponentList components={props.components} />
              </Collapse>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.main}>{props.children}</div>
    </div>
  );
}

SideBarView.propTypes = {
  children: PropTypes.node.isRequired,
  components: PropTypes.array.isRequired,
  fixed: PropTypes.bool.isRequired,
};

export default SideBarView;
