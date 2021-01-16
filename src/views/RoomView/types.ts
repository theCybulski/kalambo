import { CATEGORIES } from '../../shared/constants/keywords/categories';
import { COMPLEXITY } from '../../shared/constants/keywords/complexity';

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
  isOn: boolean;
  roundNo: number;
  drawingPlayerId: string;
  keyword: Keyword;
  startedAt: Date;
  length: number;
};

export type DrawingControls = {
  mode: string;
  strokeWidth: number;
  strokeColor: string;
}

export type Keyword = {
  category: CATEGORIES;
  complexity: COMPLEXITY;
  keyword: string;
}
