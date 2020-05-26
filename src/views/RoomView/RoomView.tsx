import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { parse } from 'query-string';
import { observer } from 'mobx-react';
import { useStores } from 'hooks/useStores';
import socket from 'api/api';

import FlipChart from 'components/FlipChart/FlipChart';
import DrawingControls from 'components/FlipChart/DrawingControls';
import TopBar from 'components/TopBar/TopBar';
import Chat from 'components/Chat/Chat';

import * as Styled from './RoomViewStyles';

const RoomView: React.FC = observer(() => {
  const {
    playersStore: { localPlayer, setLocalPlayer },
  } = useStores();

  const {
    location: { search },
  } = useHistory();

  const flipChart = useRef(null);

  useEffect(() => {
    socket.emit(
      'join',
      {
        name: parse(search).name,
        room: parse(search).id,
      },
      (id) => {
        setLocalPlayer({
          id,
          name: parse(search).name,
          avatar: 'http://placebeard.it/300/300',
          score: 151,
        });
      }
    );

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [setLocalPlayer, search]);

  const clearFlipChart = () => {
    flipChart.current.clearAll();
  };

  return (
    <Styled.Wrapper>
      <TopBar />
      {localPlayer ? (
        <Styled.Grid>
          <Styled.FlipChartWrapper>
            <Styled.CardFlipChart corners="10px 20px 20px 10px">
              <FlipChart ref={flipChart} />
            </Styled.CardFlipChart>
          </Styled.FlipChartWrapper>

          <Styled.SideElementsWrapper>
            <Styled.CardChat corners="20px 10px 20px 20px">
              {socket && <Chat roomNo={`${parse(search).id}`} />}
            </Styled.CardChat>
            <Styled.CardControls corners="20px 20px 10px 20px">
              <DrawingControls onClear={clearFlipChart} />
            </Styled.CardControls>
          </Styled.SideElementsWrapper>
        </Styled.Grid>
      ) : (
        <h1>No player</h1>
      )}
    </Styled.Wrapper>
  );
});

export default RoomView;
