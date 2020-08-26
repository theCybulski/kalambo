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
}

class PlayerStore implements IPlayerStore {
  @observable localPlayer: playerType = {
    id: 'test123',
    name: 'Test player',
    avatar: '',
    score: '100',
    roomNo: '321987',
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

const playerStore = new PlayerStore();
export default playerStore;
