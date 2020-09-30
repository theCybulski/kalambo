import React, { useCallback, useMemo } from 'react';

import * as Styled from './TopBarStyles';
import { useStores } from 'hooks/useStores';
import { observer } from 'mobx-react';
import socket from '../../api/api';

export type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = observer(() => {
  const {
    playerStore: {
      localPlayer: { isReady },
      setPlayerReady,
    },
    roomStore: {
      roomNo,
      roomAdmin,
      players,
      currRound: { timer, isOn, roundNo },
      isEverybodyReady,
    },
  } = useStores();

  const displayTimer = useMemo(() => {
    const min = Math.floor(timer / 60);
    const sec = timer - min * 60;

    if (sec === 0 && min === 0) return '0:00';

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  }, [timer]);

  const adminName = useMemo(() => {
    const name = players?.find((player) => player.id === roomAdmin)?.name;

    return name;
  }, [roomAdmin, players]);

  const startRound = () => {
    socket.emit('startRound', { roomNo });
    setPlayerReady(false);
  };

  const handleSetPlayerReady = useCallback(() => {
    setPlayerReady(!isReady);
  }, [isReady, setPlayerReady]);

  return (
    <Styled.Wrapper>
      <Styled.Grid>
        <Styled.InfoWrapper>
          <Styled.Info>
            Room: {roomNo}
            <span>Admin: {adminName}</span>
          </Styled.Info>
          <Styled.Timer data-cy="round-timer">{displayTimer}</Styled.Timer>
        </Styled.InfoWrapper>
        <Styled.ControlsWrapper>
          <div>
            <h1>Controls</h1>
            <button onClick={startRound} disabled={!isEverybodyReady || isOn} data-cy="btn-start-round">
              Start Round
            </button>
            <br />
            <button onClick={handleSetPlayerReady} data-cy="btn-ready">
              {isReady ? 'Not ready' : 'Ready'}
            </button>
          </div>
          <div data-cy="round-counter">
            Round #{roundNo} {isOn && '+'}
          </div>
        </Styled.ControlsWrapper>
      </Styled.Grid>
    </Styled.Wrapper>
  );
});

export default TopBar;
