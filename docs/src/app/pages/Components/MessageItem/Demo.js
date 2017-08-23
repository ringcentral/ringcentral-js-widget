import React from 'react';
// eslint-disable-next-line
import MessageItem from 'ringcentral-widget/components/MessageItem';

const props = {};
props.conversation = {
  conversationId: 'test string',
  subject: 'test',
  correspondents: [],
  correspondentMatches: [],
  conversationMatches: [],
};
props.areaCode = 'test string';
props.countryCode = 'test string';
props.currentLocale = 'en-US';
props.dateTimeFormatter = () => null;
props.showConversationDetail = () => null;

/**
 * A example of `MessageItem`
 */
const MessageItemDemo = () => (
  <MessageItem
    {...props}
  />
);
export default MessageItemDemo;
