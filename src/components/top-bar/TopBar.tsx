import React, { useCallback, useContext, useMemo } from 'react';

import { RoomContext } from 'views/RoomView/RoomContext';
import styles from './TopBar.module.scss';
import { Controls } from './controls/Controls';
import { RoomInfo } from './room-info/RoomInfo';
import { wsEvents } from '../../shared/constants/wsEvents';

export type TopBarProps = {};

export const TopBar: React.FC<TopBarProps> = () => {
  const {
    sockets: {
      room: roomSocket,
    },
    settings,
    localPlayer,
    setLocalPlayer,
    round,
    players,
  } = useContext(RoomContext);

  const adminName = useMemo(() =>
      players?.find(player => player.id === settings.adminId)?.name,
  [players, settings.adminId]);

  const drawingPlayerName = useMemo(() =>
      players?.find(player => player.id === round.drawingPlayerId)?.name,
  [players, round.drawingPlayerId]);

  const handleSetPlayerReady = useCallback(() => {
    setLocalPlayer(prevState => ({ ...prevState, isReady: !prevState.isReady }));
    roomSocket.emit(wsEvents.toServer.round.updatePlayers, {
      ...localPlayer, isReady: !localPlayer.isReady, roomId: settings.roomId,
    });
  }, [roomSocket, setLocalPlayer, settings, localPlayer]);

  const isEverybodyReady = useMemo(() =>
    players.every(player => player.isReady), [players]);

  const handleStartRound = useCallback(() => {
    setLocalPlayer(prevState => ({ ...prevState, isReady: false }));
    roomSocket.emit(wsEvents.toServer.round.start, { roomId: settings.roomId });
  }, [roomSocket, setLocalPlayer, settings.roomId]);

  const isAdmin = localPlayer.id === settings.adminId;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <RoomInfo
          roomId={settings.roomId}
          isRoundOn={round.isOn}
          isLocalPlayerReady={localPlayer.isReady}
          roundLength={round.length}
          roundStartedAt={round.startedAt}
          {...{
            adminName,
            drawingPlayerName,
            handleSetPlayerReady,
          }}
        />
        <Controls
          onStartRound={handleStartRound}
          isRoundOn={round.isOn}
          roundNo={round.roundNo}
          score={localPlayer.score.toString()}
          {...{
            isAdmin,
            isEverybodyReady,
          }}
        />
      </div>
    </div>
  );
};
