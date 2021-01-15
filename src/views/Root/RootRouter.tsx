import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomeView } from 'views/HomeView/HomeView';
import { RoomView } from 'views/RoomView/RoomView';

const RootRouter: React.FC = () => (
  <Switch>
    <Route exact path="/" component={HomeView} />
    <Route exact path="/room" component={RoomView} />
  </Switch>
);

export default RootRouter;
