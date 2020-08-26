import React, { useEffect, useState, useRef } from 'react';
import { useStores } from 'hooks/useStores';
import { observer } from 'mobx-react';
import socket from 'api/api';

import Message from 'components/Chat/Message';
import Input from 'components/Input/Input';

import * as Styled from './ChatStyles';
import Form from '../Form/Form';

export type ChatProps = {};

const Chat: React.FC<ChatProps> = observer((props) => {
  const {
    playerStore: {
      localPlayer: { id: localPlayerId, name, roomNo },
    },
  } = useStores();
  const messagesContainer = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinChat', { name, roomNo }, () => {});
  }, [name, roomNo]);

  useEffect(() => {
    socket.on('msgFromServer', (message) => {
      const { current: msgsCont } = messagesContainer;

      setMessages((prevState) => [...prevState, message]);

      // @ts-ignore
      msgsCont.scrollTo(0, msgsCont.scrollHeight);
    });

    return () => socket.removeAllListeners('msgFromServer');
  }, []);

  const sendMessage = (data) => {
    const { message } = data;

    message && socket.emit('msgFromClient', { message, roomNo }, () => {});
  };

  return (
    <Styled.Wrapper>
      <Styled.MessagesContainer ref={messagesContainer}>
        {messages.map((message, index) => {
          const isLocalPlayer = message.id === localPlayerId;

          return <Message key={index} {...message} {...{ isLocalPlayer }} />;
        })}
      </Styled.MessagesContainer>
      <Styled.InputContainer>
        <Form onSubmit={sendMessage} resetOnSubmit>
          <Input name="message" placeholder="Type your message here..." autoComplete="off" />
        </Form>
      </Styled.InputContainer>
    </Styled.Wrapper>
  );
});

export default Chat;
