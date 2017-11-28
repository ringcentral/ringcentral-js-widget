import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Panel from '../Panel';
import SearchInput from '../SearchInput';
import SpinnerOverlay from '../SpinnerOverlay';

import ContactList from '../ContactList';
import ContactItem from '../ContactItem';
import styles from './styles.scss';
import i18n from './i18n';
import AddContactIcon from '../../assets/images/ContactAdd.svg';
import ContactSourceFilter from '../ContactSourceFilter';

function AddContact({
  className,
  onClick,
}) {
  return (
    <div
      className={classnames(styles.addContact, className)}
      onClick={onClick}
    >
      <div className={styles.iconContainer}>
        <AddContactIcon
          className={styles.iconNode}
        />
      </div>
    </div>
  );
}
AddContact.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
AddContact.defaultProps = {
  className: undefined,
};

export default class ContactsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: props.searchString,
      unfold: false,
    };
    this.doSearchByText = this.doSearchByText.bind(this);
    this.doSearchBySource = this.doSearchBySource.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.onUnfoldChange = (unfold) => {
      this.setState({
        unfold,
      });
    };
  }

  componentDidMount() {
    // this._restSearch();
    if (typeof this.props.onVisitPage === 'function') {
      this.props.onVisitPage();
    }
    this._applySearch({
      searchSource: this.props.searchSource,
      searchString: this.state.searchString,
      pageNumber: 1,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.searchString !== this.props.searchString) {
      nextState.searchString = nextProps.searchString;
    }
    if (!nextProps.contactSourceNames.includes(nextProps.searchSource)) {
      this._applySearch({
        searchSource: nextProps.contactSourceNames[0],
        searchString: this.state.searchString,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this._searchTimeoutId);
  }

  doSearchByText(ev) {
    const searchString = ev.target.value;
    this.setState({
      searchString,
    });
    this._applySearchTimeout({
      searchSource: this.props.searchSource,
      searchString,
      pageNumber: 1,
    });
  }

  doSearchBySource(searchSource) {
    this._applySearch({
      searchSource,
      searchString: this.state.searchString,
      pageNumber: 1,
    });
  }

  loadNextPage(pageNumber) {
    this._applySearch({
      searchSource: this.props.searchSource,
      searchString: this.state.searchString,
      pageNumber,
    });
  }

  _applySearch(args) {
    const func = this.props.onSearchContact;
    if (func) {
      func(args);
    }
  }

  _applySearchTimeout(args) {
    clearTimeout(this._searchTimeoutId);
    this._searchTimeoutId = setTimeout(() => {
      this._applySearch(args);
    }, 100);
  }

  // _restSearch() {
  //   if (this.props.onRestSearch) {
  //     this.props.onRestSearch();
  //   }
  // }

  render() {
    const {
      currentLocale,
      contactGroups,
      contactSourceNames,
      searchSource,
      showSpinner,
      getAvatarUrl,
      getPresence,
      currentPage,
      onItemSelect,
      contactSourceFilterRenderer: Filter,
      sourceNodeRenderer,
      children
    } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.actionBar}>
          <SearchInput
            className={styles.searchInput}
            value={this.state.searchString || ''}
            onChange={this.doSearchByText}
            placeholder={i18n.getString('searchPlaceholder', currentLocale)}
          />
          <Filter
            className={styles.actionButton}
            currentLocale={currentLocale}
            contactSourceNames={contactSourceNames}
            onSourceSelect={this.doSearchBySource}
            selectedSourceName={searchSource}
            unfold={this.state.unfold}
            onUnfoldChange={this.onUnfoldChange}
          />
        </div>
        <Panel className={styles.content}>
          <ContactList
            currentLocale={currentLocale}
            contactGroups={contactGroups}
            getAvatarUrl={getAvatarUrl}
            getPresence={getPresence}
            currentPage={currentPage}
            onNextPage={this.loadNextPage}
            onItemSelect={onItemSelect}
            sourceNodeRenderer={sourceNodeRenderer}
          />
        </Panel>
        {showSpinner ? (<SpinnerOverlay className={styles.spinner} />) : null}
        {children}
      </div>
    );
  }
}

ContactsView.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(ContactItem.propTypes.contact).isRequired,
  })).isRequired,
  contactSourceNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  searchSource: PropTypes.string,
  searchString: PropTypes.string,
  currentPage: PropTypes.number,
  onItemSelect: PropTypes.func,
  onSearchContact: PropTypes.func,
  contactSourceFilterRenderer: PropTypes.func,
  sourceNodeRenderer: PropTypes.func,
  onVisitPage: PropTypes.func,
  children: PropTypes.node,
  // onRestSearch: PropTypes.func,
};

ContactsView.defaultProps = {
  searchSource: undefined,
  searchString: undefined,
  currentPage: undefined,
  onItemSelect: undefined,
  onSearchContact: undefined,
  contactSourceFilterRenderer: ContactSourceFilter,
  sourceNodeRenderer: undefined,
  onVisitPage: undefined,
  children: undefined,
  // onRestSearch: undefined,
};
