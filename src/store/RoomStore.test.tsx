import { RoomStore, IRoomStore } from './RoomStore';
import axios from 'axios';
import { mockedPlayer } from './__mocks__/models';
import { API_BASE_ENDPOINT } from '../shared/config/config';

jest.mock('axios', () => ({
  __esModule: true,
  default: ({ method, url }) => ({ method, url }),
  namedExport: jest.fn(),
}));

describe('RoomStore', () => {
  let store: IRoomStore;
  const defaultStoreValuesCheck = () => {
    expect(store.roomNo).toBe(null);
    expect(store.roomAdmin).toBe(null);
    expect(store.drawingPlayerId).toBe(null);
    expect(store.currRound.isOn).toBe(false);
    expect(store.currRound.roundNo).toBe(1);
    expect(store.currRound.roundsQty).toBe(5);
    expect(store.currRound.duration).toBe(90);
    expect(store.currRound.timer).toBe(null);
    expect(store.currRound.keyWord).toBe(null);
    expect(store.players).toHaveLength(0);
    expect(store.isEverybodyReady).toBe(false);
  };

  beforeEach(() => {
    store = new RoomStore();
  });

  it('Initiates with default values', () => {
    defaultStoreValuesCheck();
  });

  it('Updates timer', () => {
    expect(store.currRound.timer).toBe(null);

    store.updateTimer(90);

    expect(store.currRound.timer).toBe(90);
  });

  it('Sets players in Room', () => {
    expect(store.players).toHaveLength(0);

    store.setPlayersInRoom([mockedPlayer]);

    expect(store.players).toHaveLength(1);

    store.setPlayersInRoom([...store.players, mockedPlayer]);

    expect(store.players).toHaveLength(2);
  });

  it('Sets drawing player', () => {
    expect(store.drawingPlayerId).toBe(null);

    store.setDrawingPlayer('321');

    expect(store.drawingPlayerId).toBe('321');

    store.setDrawingPlayer('123');

    expect(store.drawingPlayerId).toBe('123');
  });

  it('Sends proper request for joining the room', () => {
    expect(JSON.stringify(store.joinRoom('asdf', '123', 'testRoom'))).toBe(
      JSON.stringify({
        method: 'get',
        url: `${API_BASE_ENDPOINT}/api/v1/join_room?playerName=asdf&socketId=123&roomNo=testRoom`,
      })
    );
  });

  it('Returns current room settings', () => {
    expect(JSON.stringify(store.getRoomSettings())).toBe(
      JSON.stringify({
        roomNo: null,
        roomAdmin: null,
        drawingPlayerId: null,
        currRound: {
          isOn: false,
          roundNo: 1,
          roundsQty: 5,
          duration: 90,
          timer: null,
          keyWord: null,
        },
        players: [],
      })
    );

    store.setDrawingPlayer('123');

    expect(JSON.stringify(store.getRoomSettings())).toBe(
      JSON.stringify({
        roomNo: null,
        roomAdmin: null,
        drawingPlayerId: '123',
        currRound: {
          isOn: false,
          roundNo: 1,
          roundsQty: 5,
          duration: 90,
          timer: null,
          keyWord: null,
        },
        players: [],
      })
    );
  });

  it('Sets room settings', () => {
    defaultStoreValuesCheck();

    store.setRoomSettings({
      roomNo: '123',
      roomAdmin: 'adminId',
      players: [mockedPlayer],
      drawingPlayerId: '123',
      currRound: {
        isOn: true,
        roundNo: 2,
        roundsQty: 7,
        duration: 60,
        timer: 49,
        keyWord: 'foo',
      },
    });

    expect(store.roomNo).toBe('123');
    expect(store.roomAdmin).toBe('adminId');
    expect(store.players).toHaveLength(1);
    expect(store.drawingPlayerId).toBe('123');
    expect(store.currRound.isOn).toBe(true);
    expect(store.currRound.roundNo).toBe(2);
    expect(store.currRound.roundsQty).toBe(7);
    expect(store.currRound.duration).toBe(60);
    expect(store.currRound.timer).toBe(49);
    expect(store.currRound.keyWord).toBe('foo');
  });
});
