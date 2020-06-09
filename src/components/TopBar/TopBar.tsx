import React, { useMemo } from 'react';

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
    const name = players.find((player) => player.id === roomAdmin).name;

    return name;
  }, [roomAdmin, players]);

  const startRound = () => {
    socket.emit('startRound', { roomNo });
    setPlayerReady(false);
  };

  return (
    <Styled.Wrapper>
      <Styled.Grid>
        <Styled.InfoWrapper>
          <Styled.Info>
            Room: {roomNo}
            <span>Admin: {adminName}</span>
          </Styled.Info>
          <Styled.Timer>{displayTimer}</Styled.Timer>
        </Styled.InfoWrapper>
        <Styled.ControlsWrapper>
          <div>
            <h1>Controls</h1>
            <button onClick={startRound} disabled={!isEverybodyReady || isOn}>
              Start Round
            </button>
            <br />
            <button onClick={() => setPlayerReady(!isReady)}>
              {isReady ? 'Not ready' : 'Ready'}
            </button>
          </div>
          <div>
            Round #{roundNo} {isOn && '+'}
          </div>
        </Styled.ControlsWrapper>
      </Styled.Grid>
    </Styled.Wrapper>
  );
});

export default TopBar;
