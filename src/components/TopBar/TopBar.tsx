import React, { useCallback, useContext, useMemo } from "react";
import { observer } from "mobx-react";

import { RoomContext } from "views/RoomView/RoomContext";
import { wsEvents } from "shared/constants";

import * as Styled from "./TopBarStyles";

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

  const displayTimer = useMemo(() => {
    const min = Math.floor(round.timer / 60);
    const sec = round.timer - min * 60;

    if (sec === 0 && min === 0) return "0:00";

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  }, [round.timer]);

  const adminName = useMemo(() => {
    return players?.find((player) => player.id === settings.adminId)?.name;
  }, [players, settings]);

  const isEverybodyReady = useMemo(() => {
    return players.every(player => player.isReady);
  }, [players]);

  const startRound = useCallback(() => {
    setLocalPlayer(prevState => ({ ...prevState, isReady: false }));
    roomSocket.emit("startRound", { roomId: settings.roomId });
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
            Room: {settings.roomId}
            <span>Admin: {adminName}</span>
          </Styled.Info>
          <Styled.Timer data-cy="round-timer">{displayTimer}</Styled.Timer>
        </Styled.InfoWrapper>
        <Styled.ControlsWrapper>
          <div>
            <h1>Controls</h1>
            <button onClick={startRound} disabled={!isEverybodyReady || round.isOn} data-cy="btn-start-round">
              Start Round
            </button>
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
