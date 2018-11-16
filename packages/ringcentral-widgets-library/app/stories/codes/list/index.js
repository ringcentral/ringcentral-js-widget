import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import CallItem from '../../../components/List/CallItem';
import MediaItem from '../../../components/List/MediaItem';

storiesOf('List', module)
  .add('callItem', () => {
    const props = {
      avatarUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1542096539&di=1b15909917afacfde67df9f1ec893d2c&src=http://b-ssl.duitang.com/uploads/item/201501/25/20150125100619_waZTn.jpeg',
      userName: text('userName', 'kyle'),
      isOnline: boolean('isOnline', false),
      isConference: boolean('isConference', false),
      converenceNumber: number('converenceNumber', 1),
      showEndCall: boolean('showEndCall', true),
      onEndCall: action('onEndCall clicked'),
      showAnswerCall: boolean('showAnswerCall', true),
      onAnswerCall: action('onAnswerCall clicked'),
      showMergeCall: boolean('showMergeCall', true),
      onMergeCall: action('onMergeCall clicked'),
      showExtraInfo: boolean('showExtraInfo', false),
      extraInfo: text('extraInfo', 'hello'),
    };
    return <CallItem {...props} />;
  })
  .add('MediaItem.Call', () => {
    const props = {

    };
    const callProps = {
      info: {
        name: 'Kyle',
        describe: 'Hello, my name is Kyle and what\'s your name ?',
        timestamp: Date.now()
      }
    };
    return (
      <MediaItem {...props}>
        <MediaItem.Call {...callProps} />
      </MediaItem>
    );
  })
  .add('MediaItem.Media', () => {
    const options = [
      'VoiceMail',
      'Message',
      'ActivityCall',
    ];
    const defaultValue = 'VoiceMail';

    const mediaProps = {
      info: {
        name: 'Kyle',
        describe: 'Hello, my name is Kyle and what\'s your name ?',
        timestamp: Date.now()
      },
      type: select('types', options, defaultValue)
    };
    return (
      <MediaItem>
        <MediaItem.Media {...mediaProps} />
      </MediaItem>
    );
  });