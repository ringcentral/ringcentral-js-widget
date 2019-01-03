import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number, select, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import Wrapper from '../../../addons/wrapper';

import CallItem from '../../../components/List/CallItem';
import MediaItem from '../../../components/List/MediaItem';
import NormalItem from '../../../components/List/NormalItem';

storiesOf('Components/List', module)
  .addDecorator(Wrapper)
  .add('CallItem', () => {
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
      key: 'callItem'
    };
    return <CallItem {...props} />;
  })
  .add('MediaItem.Call', () => {
    const props = {

    };
    const callProps = {
      info: {
        name: text('name', 'kyle'),
        describe: text('describe', 'Hello, my name is Kyle and what\'s your name ?'),
        timestamp: number('timestamp', Date.now())
      },
      onLog: action('on log clicked'),
      isLogged: boolean('isLogged', false),
      onHangUp: action('on hangup clicked'),
      onTransfer: action('on transfer clicked')
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
    const defaultValue = 'Message';

    const mediaProps = {
      info: {
        name: 'Kyle',
        describe: 'Hello, my name is Kyle and what\'s your name ?',
        timestamp: 1542879420008
      },
      type: select('types', options, defaultValue),
      isLogged: boolean('isLogged', false),
      onLog: action('on log clicked')
    };
    return (
      <MediaItem>
        <MediaItem.Media {...mediaProps} />
      </MediaItem>
    );
  })
  .add('NormalItem.line', () => {
    const props = {
      label: text('label', 'hello line'),
      onClick: action('line clicked')
    };
    const { Line } = NormalItem;
    return (
      <NormalItem>
        <Line {...props} />
      </NormalItem>
    );
  })
  .add('NormalItem.switch', () => {
    const props = {
      label: text('label', 'hello switch'),
      title: text('Title', 'Switch Title'),
      checked: boolean('Checked', true),
      onChange: action('onChange'),
      disable: boolean('Disabled', false),
    };
    const { Switch } = NormalItem;
    return (
      <NormalItem>
        <Switch {...props} />
      </NormalItem>
    );
  });