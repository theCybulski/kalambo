import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import socket from 'api/api';
import { useStores } from 'hooks/useStores';

import HomeView from 'views/HomeView/HomeView';
import RoomView from 'views/RoomView/RoomView';
import SpectateView from 'views/SpectateView/SpectateView';

const RootRouter: React.FC = observer(() => {
  const {
    playerStore: {
      localPlayer: { id, roomNo },
    },
  } = useStores();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/room' && roomNo) {
      socket.emit('leaveRoom', { id, roomNo }, () => {});

      return () => socket.removeAllListeners('leaveRoom');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Switch>
      <Route exact path={'/'} render={() => <HomeView />} />
      <Route exact path={'/room'} render={() => <RoomView />} />
      <Route exact path={'/spectate'} render={() => <SpectateView />} />
    </Switch>
  );
});

export default RootRouter;
