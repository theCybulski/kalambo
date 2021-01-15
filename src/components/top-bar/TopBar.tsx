import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { RoomContext } from 'views/RoomView/RoomContext';
import { wsEvents } from 'shared/constants/wsEvents';

import Heading, { headingVariant } from '../heading/Heading';
import { Button } from '../button/Button';
import styles from './TopBar.module.scss';

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

  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (round.isOn) {
      const timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const startTime = new Date(round.startedAt).getTime();

        const isTimeUp = currentTime - startTime >= round.length;

        setTimer(round.length - (currentTime - startTime));

        if (isTimeUp) clearInterval(timerInterval);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
    setTimer(0);
  }, [round.isOn, round.length, round.startedAt]);

  const displayTimer = useMemo(() => {
    const min = Math.floor(timer / 60000);
    const sec = parseInt(((timer % 60000) / 1000).toFixed(0));

    if (sec === 0 && min === 0) return '0:00';

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  }, [timer]);

  const adminName = useMemo(() =>
    players?.find(player => player.id === settings.adminId)?.name,
  [players, settings.adminId]);

  const drawingPlayerName = useMemo(() =>
    players?.find(player => player.id === round.drawingPlayerId)?.name,
  [players, round.drawingPlayerId]);

  const isEverybodyReady = useMemo(() =>
    players.every(player => player.isReady), [players]);

  const startRound = useCallback(() => {
    setLocalPlayer(prevState => ({ ...prevState, isReady: false }));
    roomSocket.emit(wsEvents.toServer.round.start, { roomId: settings.roomId });
  }, [roomSocket, setLocalPlayer, settings.roomId]);

  const handleSetPlayerReady = useCallback(() => {
    setLocalPlayer(prevState => ({ ...prevState, isReady: !prevState.isReady }));
    roomSocket.emit(wsEvents.toServer.round.updatePlayers, {
      ...localPlayer, isReady: !localPlayer.isReady, roomId: settings.roomId,
    });
  }, [roomSocket, setLocalPlayer, settings, localPlayer]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.infoWrapper}>
          <Heading as={headingVariant.h3} className={styles.info}>
            <Link to="/">[Leave room]</Link><br />
            Room: {settings.roomId}
            <span>
              Admin: {adminName}
              {drawingPlayerName && ` | Drawing: ${drawingPlayerName}`}
            </span>
          </Heading>
          <Heading
            as={headingVariant.h3}
            className={styles.timer}
            data-cy="round-timer"
          >
            {displayTimer}
          </Heading>
        </div>
        <div className={styles.controlsWrapper}>
          <div>
            <h1>Controls</h1>
            My score: {localPlayer.score}
            {localPlayer.id === settings.adminId && !round.isOn && (
              <Button
                onClick={startRound}
                disabled={!isEverybodyReady || round.isOn}
                data-cy="btn-start-round"
              >
                Start Round
              </Button>
            )}
            <br />
            <Button
              onClick={handleSetPlayerReady}
              data-cy="btn-ready"
            >
              {localPlayer.isReady ? 'Not ready' : 'Ready'}
            </Button>
          </div>
          <div data-cy="round-counter">
            Round #{round.roundNo} {round.isOn && '+'}
          </div>
        </div>
      </div>
    </div>
  );
};
