import { IPlayerStore, PlayerStore } from "./PlayerStore";
import { mockedPlayer } from "./__mocks__/models";

describe('PlayerStore', () => {
  let store: IPlayerStore;

  beforeEach(() => {
    store = new PlayerStore();
  })

  it('Initiates with default values', () => {
    expect(store.localPlayer.id).toBe(null);
    expect(store.localPlayer.name).toBe(null);
    expect(store.localPlayer.avatar).toBe(null);
    expect(store.localPlayer.score).toBe(null);
    expect(store.localPlayer.roomNo).toBe(null);
    expect(store.localPlayer.isReady).toBe(false);
  })

  it('Sets local player', () => {
    store.setLocalPlayer(mockedPlayer)

    expect(store.localPlayer.id).toBe('123');
    expect(store.localPlayer.name).toBe('Test player');
    expect(store.localPlayer.avatar).toBe('');
    expect(store.localPlayer.score).toBe('999');
    expect(store.localPlayer.roomNo).toBe('test room');
    expect(store.localPlayer.isReady).toBe(true);
  })

  it('Sets player to be ready or not', () => {
    expect(store.localPlayer.isReady).toBe(false);
    store.setPlayerReady(true);
    expect(store.localPlayer.isReady).toBe(true);
  })
})
