import React, { useEffect, useRef } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { parse } from 'query-string';
import { observer } from 'mobx-react';
import { useStores } from 'hooks/useStores';
import socket from 'api/api';

import FlipChart from 'components/FlipChart/FlipChart';
import DrawingControls from 'components/FlipChart/DrawingControls';
import TopBar from 'components/TopBar/TopBar';
import Chat from 'components/Chat/Chat';

import * as Styled from './RoomViewStyles';

const RoomView = observer(() => {
  const {
    playerStore: {
      localPlayer,
      localPlayer: { id: localPlayerId, roomNo: roomNumber, name: localPlayerName },
      setLocalPlayer,
    },
    roomStore: {
      drawingPlayerId,
      currRound: { isOn },
    },
  } = useStores();

  const isDrawing = localPlayerId === drawingPlayerId;

  const {
    location: { search },
  } = useHistory();

  const flipChart = useRef(null);

  useEffect(() => {
    if (socket) {
      const { id: roomNo } = parse(search);

      console.log(roomNumber);

      socket.emit(
        'joinRoom',
        {
          name: localPlayerName,
          roomNo,
        },
        ({ player, error }) => {
          error && console.log(new Error(error));
        }
      );

      return () => {
        socket.emit('disconnect', { localPlayer });
        // socket.off();
      };
    }
  }, [setLocalPlayer, localPlayerName, localPlayer, roomNumber, search]);

  const clearFlipChart = () => {
    flipChart.current.clearAll();
  };

  return (
    <Styled.Wrapper>
      {localPlayerId ? (
        <>
          <TopBar />
          <Styled.Grid>
            <Styled.FlipChartWrapper>
              <Styled.CardFlipChart corners="10px 20px 20px 10px">
                {socket && isOn && <FlipChart ref={flipChart} />}
              </Styled.CardFlipChart>
            </Styled.FlipChartWrapper>

            <Styled.SideElementsWrapper>
              <Styled.CardChat corners="20px 10px 20px 20px">{socket && <Chat />}</Styled.CardChat>
              <Styled.CardControls corners="20px 20px 10px 20px">
                {isDrawing && isOn && <DrawingControls onClear={clearFlipChart} />}
              </Styled.CardControls>
            </Styled.SideElementsWrapper>
          </Styled.Grid>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </Styled.Wrapper>
  );
});

export default RoomView;
