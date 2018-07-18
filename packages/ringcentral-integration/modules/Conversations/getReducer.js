import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import messageTypes from '../../enums/messageTypes';
import { normalizeRecord } from '../../lib/messageHelper';
import status from './status';

export function getSearchInputReducer(types) {
  return (state = '', { type, input = '' }) => {
    switch (type) {
      case types.updateSearchInput:
        return input;
      case types.resetSuccess:
        return '';
      default:
        return state;
    }
  };
}

export function getTypeFilterReducer(types) {
  return (state = messageTypes.all, { type, typeFilter }) => {
    switch (type) {
      case types.updateTypeFilter:
        return typeFilter;
      case types.resetSuccess:
        return messageTypes.all;
      default:
        return state;
    }
  };
}

export function getOldConversationsReducer(types) {
  return (state = [], { type, records, conversationId }) => {
    switch (type) {
      case types.fetchOldConverstaionsSuccess:
        return [].concat(state).concat(records.map(normalizeRecord));
      case types.deleteConversation:
        return state.filter(c => c.conversationId !== conversationId);
      case types.cleanOldConversatioans:
      case types.resetSuccess:
      case types.updateTypeFilter:
      case types.initSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getFetchConversationsStatusReducer(types) {
  return (state = status.idle, { type }) => {
    switch (type) {
      case types.fetchOldConverstaions:
        return status.fetching;
      case types.fetchOldConverstaionsSuccess:
      case types.fetchOldConverstaionsError:
      case types.resetSuccess:
      case types.updateTypeFilter:
      case types.initSuccess:
        return status.idle;
      default:
        return state;
    }
  };
}

export function getCurrentPageReducer(types) {
  return (state = 1, { type }) => {
    switch (type) {
      case types.increaseCurrentPage:
      case types.fetchOldConverstaionsSuccess:
        return state + 1;
      case types.updateTypeFilter:
      case types.resetSuccess:
      case types.initSuccess:
      case types.resetCurrentPage:
        return 1;
      default:
        return state;
    }
  };
}

export function getCurrentConversationIdReducer(types) {
  return (state = null, { type, conversationId }) => {
    switch (type) {
      case types.updateCurrentConversationId:
        return conversationId;
      case types.initSuccess:
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getOldMessagesReducer(types) {
  return (state = [], { type, records }) => {
    switch (type) {
      case types.fetchOldMessagesSuccess:
        return [].concat(state).concat(records.map(normalizeRecord));
      case types.updateCurrentConversationId:
      case types.resetSuccess:
      case types.initSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getFetchMessagesStatusReducer(types) {
  return (state = status.idle, { type }) => {
    switch (type) {
      case types.fetchOldMessages:
        return status.fetching;
      case types.fetchOldMessagesSuccess:
      case types.fetchOldMessagesError:
      case types.updateCurrentConversationId:
      case types.resetSuccess:
      case types.initSuccess:
        return status.idle;
      default:
        return state;
    }
  };
}

export function getMessageTextsReducer(types) {
  return (state = [], { type, text, conversationId }) => {
    switch (type) {
      case types.updateMessageText:
        return [{ conversationId, text }].concat(
          state.filter(msg => typeof msg === 'object' && msg.conversationId !== conversationId),
        );
      case types.removeMessageText:
        return state.filter(msg => typeof msg === 'object' && msg.conversationId !== conversationId);
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getConversationStatusReducer(types) {
  return (state = status.idle, { type }) => {
    switch (type) {
      case types.reply:
        return status.pushing;
      case types.replySuccess:
      case types.replyError:
        return status.idle;
      default:
        return state;
    }
  };
}

export default function getReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    searchInput: getSearchInputReducer(types),
    typeFilter: getTypeFilterReducer(types),
    oldConversations: getOldConversationsReducer(types),
    currentPage: getCurrentPageReducer(types),
    fetchConversationsStatus: getFetchConversationsStatusReducer(types),
    currentConversationId: getCurrentConversationIdReducer(types),
    oldMessages: getOldMessagesReducer(types),
    fetchMessagesStatus: getFetchMessagesStatusReducer(types),
    messageTexts: getMessageTextsReducer(types),
    conversationStatus: getConversationStatusReducer(types),
  });
}
