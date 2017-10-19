import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
    this.state = {
      currentVirtualPath: this.props.currentVirtualPath,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentVirtualPath) {
      this.setState({
        currentVirtualPath: nextProps.currentVirtualPath,
      });
    }
  }

  goTo(tab) {
    this.props.goTo(tab.path, tab.virtualPath);
    // seems like the goTo is asynchronous
    // so here set timeout for resolving menu looks flash issue
    setTimeout(() => {
      this.setState({
        currentVirtualPath: tab.virtualPath,
      });
    }, 10);
  }

  render() {
    const {
      className,
      button,
      childNavigationView,
      currentPath,
      tabs,
    } = this.props;

    const NavigationButton = button;
    const ChildNavigationView = childNavigationView;

    const currentVirtualPath = this.state.currentVirtualPath;
    const tabWidth = tabs.length > 0 ?
      `${(1 / tabs.length) * 100}%` :
      0;
    return (
      <nav className={classnames(styles.root, className)}>
        {
          tabs.map((tab, index) => {
            const Icon = tab.icon;
            let icon = Icon;
            if (typeof Icon === 'function') {
              icon = (tab.childTabs ? <Icon currentPath={currentPath} /> : <Icon />);
            }
            const ActiveIcon = tab.activeIcon;
            return (
              <NavigationButton
                {...tab}
                key={index}
                onClick={() => {
                  this.goTo(tab);
                }}
                active={
                  (tab.isActive && tab.isActive(currentPath, currentVirtualPath)) ||
                  (tab.path && tab.path === currentPath) ||
                  (tab.virtualPath && tab.virtualPath === currentVirtualPath)
                }
                width={tabWidth}
                icon={icon}
                activeIcon={typeof ActiveIcon === 'function' ? <ActiveIcon /> : ActiveIcon}
              />
            );
          })
        }
        {
          ChildNavigationView ? (
            <ChildNavigationView
              tabs={tabs}
              goTo={this.goTo}
              currentPath={currentPath}
              currentVirtualPath={currentVirtualPath}
            />
          ) : null
        }
      </nav>
    );
  }
}

const tabPropTypes = {
  icon: PropTypes.func,
  activeIcon: PropTypes.func,
  label: PropTypes.string,
  path: PropTypes.string,
  virtualPath: PropTypes.string,
  isActive: PropTypes.func,
  noticeCounts: PropTypes.number,
};

NavigationBar.propTypes = {
  className: PropTypes.string,
  button: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  childNavigationView: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.element.isRequired
  ]),
  tabs: PropTypes.arrayOf(PropTypes.shape({
    ...tabPropTypes,
    childTabs: PropTypes.arrayOf(PropTypes.shape({
      ...tabPropTypes,
    })),
  })),
  goTo: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  currentVirtualPath: PropTypes.string,
};

NavigationBar.defaultProps = {
  className: undefined,
  childNavigationView: undefined,
  currentVirtualPath: undefined,
  tabs: [],
};
