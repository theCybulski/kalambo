import React, { useEffect, useState, useContext, useCallback } from 'react';

import { Message } from 'components/chat/Message';
import { Input } from 'components/input/Input';
import { RoomContext } from 'views/RoomView/RoomContext';
import { wsEvents } from 'shared/constants/wsEvents';

import { Form } from '../form/Form';
import styles from './Chat.module.scss';

export const Chat: React.FC = () => {
  const {
    sockets: { chat: chatSocket },
    settings,
    localPlayer,
  } = useContext(RoomContext);
  const [messages, setMessages] = useState([]);

  const sendMessage = useCallback(
    (data) => {
      const { message } = data;

      if (message) {
        chatSocket.emit(wsEvents.toServer.chat.toServer, {
          senderName: localPlayer.name,
          senderId: localPlayer.id,
          roomId: settings.roomId,
          content: message,
        });
      }
    },
    [chatSocket, localPlayer.name, localPlayer.id, settings.roomId],
  );

  useEffect(() => {
    const data = { roomId: settings.roomId, name: localPlayer.name };

    chatSocket.emit(wsEvents.toServer.joinRoom, data);
    return () => chatSocket.emit(wsEvents.toServer.leaveRoom, data);
  }, [chatSocket, settings.roomId, localPlayer.name]);

  useEffect(() => {
    chatSocket.on(wsEvents.toClient.chat.toClient, (message) => {
      setMessages(messages => [...messages, message]);
    });

    return () => chatSocket.removeAllListeners();
  }, [chatSocket]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => {
          const isLocalPlayer = message.senderId === localPlayer.id;

          return (
            <Message
              key={index}
              senderName={message.senderName}
              isCorrect={message.isCorrect}
              content={message.content}
              isLocalPlayer={isLocalPlayer}
            />
          );
        })}
      </div>
      <div className={styles.inputContainer}>
        <Form onSubmit={sendMessage} resetOnSubmit dataCy="form-message">
          <Input
            name="message"
            placeholder="Aa"
            autoComplete="off"
            data-cy="input-message"
            className={styles.input}
          />
        </Form>
      </div>
    </div>
  );
};
