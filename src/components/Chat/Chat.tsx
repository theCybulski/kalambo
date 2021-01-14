import React, { useEffect, useState, useContext, useCallback } from "react";

import Message from "components/Chat/Message";
import Input from "components/Input/Input";
import { RoomContext } from "views/RoomView/RoomContext";

import * as Styled from "./ChatStyles";
import Form from "../Form/Form";
import { wsEvents } from "../../shared/constants";

export const Chat: React.FC = () => {
  const { sockets: { chat: chatSocket }, settings, localPlayer } = useContext(RoomContext);
  const [messages, setMessages] = useState([]);

  const sendMessage = useCallback((data) => {
    const { message } = data;

    message && chatSocket.emit(wsEvents.toServer.chat.toServer, {
      senderName: localPlayer.name,
      senderId: localPlayer.id,
      roomId: settings.roomId,
      content: message
    });
  }, [chatSocket, localPlayer.name, localPlayer.id, settings.roomId]);

  useEffect(() => {
    const data = { roomId: settings.roomId, name: localPlayer.name };

    chatSocket.emit(wsEvents.toServer.joinRoom, data);
    return () => chatSocket.emit(wsEvents.toServer.leaveRoom, data);
  }, [chatSocket, settings.roomId, localPlayer.name]);

  useEffect(() => {
    chatSocket.on(wsEvents.toClient.chat.toClient, (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => chatSocket.removeAllListeners();
  }, [chatSocket]);

  return (
    <Styled.Wrapper>
      <Styled.MessagesContainer>
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
      </Styled.MessagesContainer>
      <Styled.InputContainer>
        <Form onSubmit={sendMessage} resetOnSubmit dataCy="form-message">
          <Input name="message" placeholder="Type your message here..." autoComplete="off" data-cy="input-message"/>
        </Form>
      </Styled.InputContainer>
    </Styled.Wrapper>
  );
};
