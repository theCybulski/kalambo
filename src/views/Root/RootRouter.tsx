import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomeView from 'views/HomeView/HomeView';
import RoomView from 'views/RoomView/RoomView';
import SpectateView from 'views/SpectateView/SpectateView';

const history = createBrowserHistory();
const RootRouter: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={'/'} render={() => <HomeView />} />
        <Route exact path={'/room'} render={() => <RoomView />} />
        <Route exact path={'/spectate'} render={() => <SpectateView />} />
      </Switch>
    </Router>
  );
};

export default RootRouter;
