import React from 'react';
import cn from 'classnames';

import styles from './Message.module.scss';

export type MessageProps = {
  timestamp?: string;
  senderName: string;
  avatar?: string | null;
  content: string;
  isCorrect: boolean;
  isLocalPlayer: boolean;
};

export const Message = ({
  senderName,
  avatar,
  content,
  isCorrect,
  isLocalPlayer,
}: MessageProps) => (
  <div className={styles.wrapper}>
    {avatar && (
      <div className={styles.wrapper} data-cy="message-avatar">
        <img className={styles.avatar} src={avatar} alt={senderName} />
      </div>
    )}

    <div
      className={cn(
        styles.messageWrapper,
        { [styles.isLocalPlayer]: isLocalPlayer },
        { [styles.isCorrect]: isCorrect },
      )}
      data-cy={`message-wrapper${isCorrect ? '-correct' : ''}`}
    >
      {senderName && !isLocalPlayer && (
        <div className={styles.sender} data-cy="message-sender">
          {senderName}
        </div>
      )}
      <div className={styles.message} data-cy={`message-content${isCorrect ? '-correct' : ''}`}>
        {content}
      </div>
    </div>
  </div>
);
