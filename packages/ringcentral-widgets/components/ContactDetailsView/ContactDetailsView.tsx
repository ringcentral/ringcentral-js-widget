import React, { FunctionComponent, useEffect } from 'react';
import BackHeader from '../BackHeader';
import Panel from '../Panel';

import { ContactDetails } from '../ContactDetails';
import styles from './styles.scss';
import i18n from './i18n';
import {
  ContactDetailsViewFunctionProps,
  ContactDetailsViewProps,
} from './ContactDetailsView.interface';

interface MessageHolderProps {
  children: string;
}
const MessageHolder: FunctionComponent<MessageHolderProps> = ({ children }) => {
  return <div className={styles.placeholder}>{children}</div>;
};

export const ContactDetailsView: FunctionComponent<
  ContactDetailsViewFunctionProps & ContactDetailsViewProps
> = ({
  children,
  contact,
  currentLocale,
  isMultipleSiteEnabled,
  isCallButtonDisabled,
  disableLinks,
  showSpinner,
  formatNumber,
  canCallButtonShow,
  canTextButtonShow,
  onBackClick,
  onVisitPage,
  onLeavingPage,
  onClickMailTo,
  onClickToDial,
  onClickToSMS,
  sourceNodeRenderer,
}) => {
  useEffect(() => {
    if (typeof onVisitPage === 'function') {
      onVisitPage();
    }
    return () => {
      if (typeof onLeavingPage === 'function') {
        onLeavingPage();
      }
    };
  }, []);
  let content = null;
  if (showSpinner) {
    content = (
      <MessageHolder>
        {i18n.getString('loadingContact', currentLocale)}
      </MessageHolder>
    );
  } else if (!contact) {
    content = (
      <MessageHolder>
        {i18n.getString('contactNotFound', currentLocale)}
      </MessageHolder>
    );
  } else {
    content = (
      <ContactDetails
        currentLocale={currentLocale}
        contact={contact}
        canCallButtonShow={canCallButtonShow}
        canTextButtonShow={canTextButtonShow}
        onClickToSMS={onClickToSMS}
        onClickToDial={onClickToDial}
        isMultipleSiteEnabled={isMultipleSiteEnabled}
        isCallButtonDisabled={isCallButtonDisabled}
        disableLinks={disableLinks}
        onClickMailTo={onClickMailTo}
        formatNumber={formatNumber}
        sourceNodeRenderer={sourceNodeRenderer}
      />
    );
  }

  return (
    <div className={styles.root}>
      <BackHeader onBackClick={onBackClick} className={styles.header}>
        {i18n.getString('contactDetails', currentLocale)}
      </BackHeader>
      <Panel className={styles.content}>
        {content}
        {children}
      </Panel>
    </div>
  );
};
