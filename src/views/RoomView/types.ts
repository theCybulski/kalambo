export type RoomSettings = {
  roomId: string;
  adminId: string;
  gameLength: number;
}

export type Player = {
  id: string;
  name: string;
  score: number;
  isReady: boolean;
}

export type RoomRound = {
  isOn: boolean
  roundNo: number;
  drawingPlayerId: string;
  keyword: string;
  timer: number;
};

export type DrawingControls = {
  mode: string;
  strokeWidth: number;
  strokeColor: string;
}
