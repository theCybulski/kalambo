import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

import { Chat } from 'components/chat/Chat';
import { API_BASE_ENDPOINT } from 'shared/config/config';
import { useSearchParams } from 'utils/use-search-params';
import { wsEvents } from 'shared/constants/wsEvents';
import { TopBar } from 'components/top-bar/TopBar';
import { FlipChart } from 'components/views/room-view/flip-chart/FlipChart';
import { DrawingControls } from 'components/views/room-view/drawing-controls/DrawingControls';

import { DrawingControls as DrawingControlsType, Player, RoomRound, RoomSettings } from './types';
import { RoomContext, defaultValues } from './RoomContext';
import styles from './RoomView.module.scss';

const chatSocket = io(`${API_BASE_ENDPOINT}/chat`);
const roomSocket = io(`${API_BASE_ENDPOINT}/room`);

export const RoomView = () => {
  const history = useHistory();

  const [localPlayer, setLocalPlayer] = useState<Player>(defaultValues.localPlayer);
  const [players, setPlayers] = useState<Player[]>(defaultValues.players);
  const [settings, setSettings] = useState<RoomSettings>(defaultValues.settings);
  const [round, setRound] = useState<RoomRound>(defaultValues.round);
  const [drawingControls, setDrawingControls] =
    useState<DrawingControlsType>(defaultValues.drawingControls);

  const { roomId, name } = useSearchParams();

  const contextValue = useMemo(() => ({
    sockets: {
      chat: chatSocket,
      room: roomSocket,
    },
    settings,
    setSettings,
    localPlayer,
    setLocalPlayer,
    players,
    setPlayers,
    round,
    setRound,
    drawingControls,
    setDrawingControls,
  }), [
    settings,
    localPlayer,
    players,
    round,
    drawingControls,
  ]);

  useEffect(() => {
    roomSocket.emit(wsEvents.toServer.joinRoom, { roomId, name });
    return () => roomSocket.emit(wsEvents.toServer.leaveRoom, roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    roomSocket.on(wsEvents.toClient.serverError, (err) => {
      console.log(err);
      if (err.code === 404) history.push('/');
    });

    roomSocket.on(wsEvents.toClient.joinedRoom, (data) => {
      setLocalPlayer(data.player);
      setSettings(data.room.settings);
      setPlayers(data.room.players);
      setRound(data.room.round);
    });

    roomSocket.on(wsEvents.toClient.round.updatePlayers, (players) => {
      setPlayers(players);
    });

    roomSocket.on(wsEvents.toClient.round.updateSettings, (settings) => {
      setSettings(settings);
    });

    roomSocket.on(wsEvents.toClient.round.updateRound, (round) => {
      setRound(round);
    });

    return () => roomSocket.removeAllListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updatedLocalPlayer = players.find(player => player.id === localPlayer.id);

    if (updatedLocalPlayer) {
      setLocalPlayer(updatedLocalPlayer);
    }
  }, [players, localPlayer.id]);

  const isLocalPlayerDrawing = localPlayer.id === round.drawingPlayerId;

  return (
    <div className={styles.wrapper}>
      <RoomContext.Provider value={contextValue}>
        <TopBar />
        <div className={styles.grid}>
          <div className={styles.flipChartWrapper}>
            <div className={styles.cardFlipChart}>
              {isLocalPlayerDrawing && settings.roomId && <DrawingControls />}
              {settings.roomId && <FlipChart />}
            </div>
          </div>

          <div className={styles.chatWrapper}>
            <div className={styles.cardChat}>
              {settings.roomId && <Chat />}
            </div>
          </div>
        </div>
      </RoomContext.Provider>
    </div>
  );
};
