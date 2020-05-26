import { observable, action } from 'mobx';

class PlayersStore {
  @observable localPlayer = null;

  @observable players = [
    {
      id: '123a32',
      name: 'Jenny Dawson',
      avatar: 'http://placekitten.com/300/300',
      score: 243,
    },
    {
      id: '123123s',
      name: 'TheCybulski',
      avatar: 'http://placebeard.it/300/300',
      score: 151,
    },
  ];

  @action.bound
  setLocalPlayer(localPlayer) {
    this.localPlayer = localPlayer;
  }
}

export const playersStore = new PlayersStore();
