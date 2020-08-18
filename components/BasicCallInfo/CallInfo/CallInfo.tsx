import React from 'react';

import styles from './styles.scss';
import { Tooltip } from '../../Rcui/Tooltip';
import { TOOLTIP_LONG_DELAY_TIME } from '../../../lib/toolTipDelayTime';

export interface CallInfoProps {
  attr?: string;
  name: string;
  content: string;
  enableCopy?: boolean;
}
export const CallInfo: React.FunctionComponent<CallInfoProps> = ({
  name,
  content,
}) => {
  return (
    <div data-sign={content} className={styles.container}>
      <div className={styles.name} title={name}>
        {name}
      </div>
      <i className={styles.flexFill} />
      <Tooltip title={content} enterDelay={TOOLTIP_LONG_DELAY_TIME}>
        <div className={styles.content}>{content}</div>
      </Tooltip>
    </div>
  );
};
