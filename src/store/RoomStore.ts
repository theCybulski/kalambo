import { observable, action } from 'mobx';
import { playerType } from './PlayerStore';
import socket from 'api/api';
import axios from 'axios';
import { API_BASE_ENDPOINT } from '../shared/config/config';

export interface IRoomStore {
  roomNo: string;
  roomAdmin: string;
  drawingPlayerId: playerType['id'];
  currRound: {
    isOn: boolean;
    roundNo: number;
    roundsQty: number;
    duration: number;
    timer: number;
    keyWord: string;
  };
  players: playerType[];
  isEverybodyReady: boolean;

  updateTimer: (newTimer: number) => void;
  setPlayersInRoom: (players: playerType[]) => void;
  setDrawingPlayer: (playerId: playerType['id']) => void;
  joinRoom: (
    playerName: playerType['name'],
    playerId: playerType['id'],
    roomNo: playerType['roomNo']
  ) => void;
}

class RoomStore implements IRoomStore {
  @observable roomNo: IRoomStore['roomNo'] = null;
  @observable roomAdmin: IRoomStore['roomAdmin'] = null;
  @observable drawingPlayerId: IRoomStore['drawingPlayerId'] = null;
  @observable currRound: IRoomStore['currRound'] = {
    isOn: false,
    roundNo: 1,
    roundsQty: 5,
    duration: 90,
    timer: null,
    keyWord: null,
  };
  @observable players: IRoomStore['players'] = [];
  @observable isEverybodyReady: IRoomStore['isEverybodyReady'] = false;

  constructor() {
    socket.on('updateTimer', ({ timer }) => {
      this.updateTimer(timer);
    });

    socket.on('setRound', ({ isOn, roundNo, keyWord }) => {
      this.currRound.isOn = isOn;
      this.currRound.roundNo = roundNo;
      this.currRound.keyWord = keyWord
    });

    socket.on('readinessCheck', (payload) => {
      this.isEverybodyReady = payload;
    });

    socket.on('updateRoomSettings', (payload) => {
      console.log({ payload });
      this.setRoomSettings({ ...this.getRoomSettings(), ...payload });
    });

    socket.on('setDrawingPlayer', ({ drawingPlayerId }) => {
      console.log(drawingPlayerId);
      this.drawingPlayerId = drawingPlayerId;
    });
  }

  @action.bound
  updateTimer(newTimer: IRoomStore['currRound']['timer']) {
    this.currRound.timer = newTimer;
  }

  @action.bound
  setPlayersInRoom(players: IRoomStore['players']) {
    this.players = players;
  }

  @action.bound
  setDrawingPlayer(playerId: playerType['id']) {
    this.drawingPlayerId = playerId;
  }

  @action.bound
  joinRoom(
    playerName: playerType['name'],
    playerId: playerType['id'],
    roomNo: playerType['roomNo']
  ) {
    return axios({
      method: 'get',
      url: `${API_BASE_ENDPOINT}/api/v1/join_room?playerName=${playerName}&socketId=${playerId}&roomNo=${roomNo}`,
    });
  }

  @action.bound
  getRoomSettings() {
    return {
      roomNo: this.roomNo,
      roomAdmin: this.roomAdmin,
      drawingPlayerId: this.drawingPlayerId,
      currRound: this.currRound,
      players: this.players,
    };
  }

  @action.bound
  setRoomSettings({
    roomNo = this.roomNo,
    roomAdmin = this.roomAdmin,
    players = this.players,
    drawingPlayerId = this.drawingPlayerId,
    currRound = this.currRound,
  }: {
    roomNo?: IRoomStore['roomNo'];
    roomAdmin?: IRoomStore['roomAdmin'];
    players?: IRoomStore['players'];
    drawingPlayerId?: IRoomStore['drawingPlayerId'];
    currRound?: IRoomStore['currRound'];
  }) {
    this.roomNo = roomNo;
    this.roomAdmin = roomAdmin;
    this.drawingPlayerId = drawingPlayerId;
    this.currRound = {
      isOn: currRound.isOn,
      roundNo: currRound.roundNo,
      roundsQty: currRound.roundsQty,
      duration: currRound.duration,
      timer: currRound.timer,
      keyWord: currRound.keyWord,
    };
    this.players = players;
  }
}

const roomStore = new RoomStore();
export default roomStore;
