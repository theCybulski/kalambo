import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";

import { RoomContext } from "views/RoomView/RoomContext";
import { wsEvents } from "shared/constants";

import * as Styled from "./TopBarStyles";
import { Link } from "react-router-dom";

export type TopBarProps = {};

export const TopBar: React.FC<TopBarProps> = observer(() => {
  const {
    sockets: {
      room: roomSocket
    },
    settings,
    localPlayer,
    setLocalPlayer,
    round,
    players
  } = useContext(RoomContext);

  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (round.isOn) {
      const timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const startTime = new Date(round.startedAt).getTime();

        const isTimeUp = currentTime - startTime >= round.length;

        setTimer(round.length - (currentTime - startTime))

        if (isTimeUp) clearInterval(timerInterval);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else {
      setTimer(0);
    }
  }, [round.isOn, round.length, round.startedAt])

  const displayTimer = useMemo(() => {
    const min = Math.floor(timer / 60000);
    const sec = parseInt(((timer % 60000) / 1000).toFixed(0));

    if (sec === 0 && min === 0) return "0:00";

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  }, [timer]);

  const adminName = useMemo(() => {
    return players?.find((player) => player.id === settings.adminId)?.name;
  }, [players, settings.adminId]);

  const drawingPlayerName = useMemo(() => {
    return players?.find(player => player.id === round.drawingPlayerId)?.name;
  }, [players, round.drawingPlayerId])

  const isEverybodyReady = useMemo(() => {
    return players.every(player => player.isReady);
  }, [players]);

  const startRound = useCallback(() => {
    setLocalPlayer(prevState => ({ ...prevState, isReady: false }));
    roomSocket.emit(wsEvents.toServer.round.start, { roomId: settings.roomId });
  }, [roomSocket, setLocalPlayer, settings.roomId]);

  const handleSetPlayerReady = useCallback(() => {
    setLocalPlayer(prevState => ({ ...prevState, isReady: !prevState.isReady }));
    roomSocket.emit(wsEvents.toServer.round.updatePlayers, {
      ...localPlayer, isReady: !localPlayer.isReady, roomId: settings.roomId
    });
  }, [roomSocket, setLocalPlayer, settings, localPlayer]);

  return (
    <Styled.Wrapper>
      <Styled.Grid>
        <Styled.InfoWrapper>
          <Styled.Info>
            <Link to='/'>[Leave room]</Link><br/>
            Room: {settings.roomId}
            <span>
              Admin: {adminName}
              {drawingPlayerName && ` | Drawing: ${drawingPlayerName}`}
            </span>
          </Styled.Info>
          <Styled.Timer data-cy="round-timer">{displayTimer}</Styled.Timer>
        </Styled.InfoWrapper>
        <Styled.ControlsWrapper>
          <div>
            <h1>Controls</h1>
            My score: {localPlayer.score}
            {localPlayer.id === settings.adminId && !round.isOn && (
              <button onClick={startRound} disabled={!isEverybodyReady || round.isOn} data-cy="btn-start-round">
                Start Round
              </button>
            )}
            <br/>
            <button onClick={handleSetPlayerReady} data-cy="btn-ready">
              {localPlayer.isReady ? "Not ready" : "Ready"}
            </button>
          </div>
          <div data-cy="round-counter">
            Round #{round.roundNo} {round.isOn && "+"}
          </div>
        </Styled.ControlsWrapper>
      </Styled.Grid>
    </Styled.Wrapper>
  );
});
