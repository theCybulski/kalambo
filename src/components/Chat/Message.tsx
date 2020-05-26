import React from 'react';

import * as Styled from './MessageStyles';

export type MessageProps = {
  timestamp: string;
  senderName: string;
  avatar: string;
  message: string;
  isCorrect: boolean;
  isLocalPlayer?: boolean;
};

const Message: React.FC<MessageProps> = ({
  timestamp,
  senderName,
  avatar,
  message,
  isCorrect,
  isLocalPlayer,
}) => {

  return (
    <Styled.Wrapper>
      {avatar && (
        <Styled.AvatarWrapper>
          <Styled.Avatar src={avatar} />
        </Styled.AvatarWrapper>
      )}

      <Styled.MessageWrapper alignRight={isLocalPlayer}>
        {senderName && <Styled.Sender>{senderName}</Styled.Sender>}
        <Styled.Message isCorrect={isCorrect} isLocalPlayer={isLocalPlayer}>{message}</Styled.Message>
      </Styled.MessageWrapper>
    </Styled.Wrapper>
  );
};

export default Message;
