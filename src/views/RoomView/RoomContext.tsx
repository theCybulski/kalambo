import React from 'react';
import { DrawingControls, Player, RoomRound, RoomSettings } from './types';

interface RoomContextProps {
  sockets: {
    chat: SocketIOClient.Socket;
    room: SocketIOClient.Socket;
  };
  settings: RoomSettings;
  setSettings?: React.Dispatch<React.SetStateAction<RoomSettings>>;
  localPlayer: Player;
  setLocalPlayer?: React.Dispatch<React.SetStateAction<Player>>;
  players: Player[];
  setPlayers?: React.Dispatch<React.SetStateAction<Player[]>>;
  round: RoomRound;
  setRound?: React.Dispatch<React.SetStateAction<RoomRound>>;
  drawingControls: DrawingControls;
  setDrawingControls?: React.Dispatch<React.SetStateAction<DrawingControls>>;
}

export const defaultValues = {
  sockets: {
    chat: null,
    room: null,
  },
  settings: {
    roomId: '',
    adminId: null,
    gameLength: 0,
  },
  localPlayer: {
    id: null,
    name: '',
    score: null,
    isReady: false,
  },
  players: [],
  round: {
    isOn: false,
    roundNo: null,
    drawingPlayerId: null,
    keyword: null,
    startedAt: null,
    length: 0,
  },
  drawingControls: {
    mode: 'brush',
    strokeWidth: 5,
    strokeColor: '#5405D4',
  },
};

export const RoomContext = React.createContext<RoomContextProps>(defaultValues);
