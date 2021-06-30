import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import { AlertLevelType } from '@ringcentral-integration/commons/modules/Alert/alertLevels';

import Message from '../Message';
import styles from './styles.scss';

export type AlertDisplayProps = {
  className?: string;
  messages?: {
    id: string;
    level: AlertLevelType;
    message: string;
    payload?: any;
    animation?: string;
    duration?: string;
    // ttl: number;
    // timestamp: number;
  }[];
  getRenderer?: (...args: any[]) => any;
  dismiss: (...args: any[]) => any;
  currentLocale: string;
  brand?: string;
  component?: (...args: any[]) => any;
  // animation?: string;
  // duration?: number;
};
const AlertDisplay: FunctionComponent<AlertDisplayProps> = ({
  component: RendererMessage,
  className,
  messages,
  dismiss,
  currentLocale,
  brand,
  getRenderer,
}) => {
  return (
    <div className={classnames(styles.root, className)}>
      {messages.map((message) => {
        const Renderer = getRenderer(message);
        if (!Renderer) return null;
        return (
          <RendererMessage
            animation={message.animation}
            duration={message.duration}
            key={message.id}
            level={message.level}
            message={
              <Renderer
                message={message}
                currentLocale={currentLocale}
                brand={brand}
              />
            }
            onDismiss={() => {
              dismiss(message.id);
            }}
          />
        );
      })}
    </div>
  );
};

AlertDisplay.defaultProps = {
  getRenderer: () => undefined,
  component: Message,
  brand: 'RingCentral',
};

export default AlertDisplay;
