import React, { useEffect, useState, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { observer } from 'mobx-react';
import { useStores } from 'hooks/useStores';
import socket from 'api/api';

import Message from 'components/Chat/Message';
import Input from 'components/Input/Input';

import * as Styled from './ChatStyles';

export type ChatProps = {
  roomNo: string;
};

const Chat: React.FC<ChatProps> = observer(({ roomNo }) => {
  const {
    playersStore: {
      localPlayer: { id: localPlayerId, name },
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

      setMessages([...messages, message]);
      // @ts-ignore
      msgsCont.scrollTo(0, msgsCont.scrollHeight);
    });

    return () => socket.removeAllListeners('msgFromServer');
  }, [messages, localPlayerId]);

  const sendMessage = ({ message }, actions) => {
    if (message) socket.emit('msgFromClient', { message }, () => actions.change('message', ''));
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
        <Form
          onSubmit={sendMessage}
          initialValues={{
            message: '',
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="message">
                {({ input: { ...props } }) => (
                  <Input {...props} placeholder="Type your message here..." autoComplete="off" />
                )}
              </Field>
            </form>
          )}
        />
      </Styled.InputContainer>
    </Styled.Wrapper>
  );
});

export default Chat;
