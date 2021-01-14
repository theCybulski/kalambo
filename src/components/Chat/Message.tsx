import React from 'react';

import * as Styled from './MessageStyles';

export type MessageProps = {
  timestamp?: string;
  senderName: string;
  avatar?: string | null;
  content: string;
  isCorrect: boolean;
  isLocalPlayer: boolean;
};

const Message: React.FC<MessageProps> = ({ senderName, avatar, content, isCorrect, isLocalPlayer }) => {
  return (
    <Styled.Wrapper>
      {avatar && (
        <Styled.AvatarWrapper data-cy="message-avatar">
          <Styled.Avatar src={avatar} />
        </Styled.AvatarWrapper>
      )}

      <Styled.MessageWrapper
        alignRight={isLocalPlayer}
        data-cy={`message-wrapper${isCorrect ? '-correct' : ''}`}
      >
        {senderName && !isLocalPlayer && (
          <Styled.Sender data-cy="message-sender">{senderName}</Styled.Sender>
        )}
        <Styled.Message
          isCorrect={isCorrect}
          isLocalPlayer={isLocalPlayer}
          data-cy={`message-content${isCorrect ? '-correct' : ''}`}
        >
          {content}
        </Styled.Message>
      </Styled.MessageWrapper>
    </Styled.Wrapper>
  );
};

export default Message;
