import { observable, action } from 'mobx';
import socket from 'api/api';

export type playerType = {
  id: string;
  name: string;
  avatar: string;
  score: string;
  roomNo: string;
  isReady: boolean;
};

export interface IPlayerStore {
  localPlayer: playerType;
  setLocalPlayer: (localPlayer: playerType) => void;
  setPlayerReady: (isReady: boolean) => void;
}

export class PlayerStore implements IPlayerStore {
  @observable localPlayer: playerType = {
    id: null,
    name: null,
    avatar: null,
    score: null,
    roomNo: null,
    isReady: false,
  };

  @action.bound
  setLocalPlayer(localPlayer: playerType) {
    this.localPlayer = localPlayer;
    socket.emit('updatePlayer', { ...this.localPlayer }, () => {});
  }

  @action.bound
  setPlayerReady(isReady) {
    this.localPlayer.isReady = isReady;
    socket.emit('updatePlayer', { ...this.localPlayer }, () => {});
  }
}
