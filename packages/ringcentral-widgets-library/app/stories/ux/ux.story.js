/**
 * @file story for ux
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from './tools/Markdown';
import markdownDemo from './source/markdown.mkd';

storiesOf('UX', module)
  .add('hello', () => {
    return <Markdown input={markdownDemo} />;
  });
