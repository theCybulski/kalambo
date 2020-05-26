import { observable } from 'mobx';

export interface IChatStore {
  messages: {}[];
}

class ChatStore implements IChatStore {
  @observable messages: [
    {
      senderID: '123a32';
      message: 'Kobra!';
      timestamp: '123';
      avatar: '';
      senderName: '',
      isCorrect: false;
    },
    {
      senderID: '123123s';
      message: 'Coś tam coś tam!';
      timestamp: '321';
      avatar: '';
      senderName: '',
      isCorrect: false;
    },
    {
      senderID: '123a32';
      message: 'asdfasdfasdf!';
      timestamp: '654';
      avatar: '';
      senderName: '',
      isCorrect: false;
    }
  ];
  //   senderID,                                          // sent with msg
  //   message,                                           // sent with msg
  //   timestamp,                                         // sent with msg
  //   avatar: isLocalPlayer ? '' : avatar,               // SERVER
  //   senderName: isLocalPlayer ? '' : senderName,       // SERVER
  //   isCorrect,                                         // SERVER
}

export const chatStore = new ChatStore();
