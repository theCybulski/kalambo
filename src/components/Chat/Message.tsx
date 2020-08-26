import React from 'react';

import * as Styled from './MessageStyles';

export type MessageProps = {
  timestamp?: string;
  player: string;
  avatar?: string | null;
  message: string;
  isCorrect: boolean;
  isLocalPlayer: boolean;
};

const Message: React.FC<MessageProps> = ({
  player,
  avatar,
  message,
  isCorrect,
  isLocalPlayer,
}) => {
  return (
    <Styled.Wrapper>
      {avatar && (
        <Styled.AvatarWrapper data-test="message-avatar">
          <Styled.Avatar src={avatar} />
        </Styled.AvatarWrapper>
      )}

      <Styled.MessageWrapper alignRight={isLocalPlayer} data-test="message-wrapper">
        {player && !isLocalPlayer && <Styled.Sender data-test="message-sender">{player}</Styled.Sender>}
        <Styled.Message isCorrect={isCorrect} isLocalPlayer={isLocalPlayer} data-test="message-content">
          {message}
        </Styled.Message>
      </Styled.MessageWrapper>
    </Styled.Wrapper>
  );
};

export default Message;
