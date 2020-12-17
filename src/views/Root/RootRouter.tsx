import React from "react";
import { Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";

import { HomeView } from "views/HomeView/HomeView";
import { RoomView } from "views/RoomView/RoomView";
// import SpectateView from "views/SpectateView/SpectateView";

const RootRouter: React.FC = observer(() => {

  return (
    <Switch>
      <Route exact path={"/"} component={HomeView}/>
      <Route exact path={"/room"} component={RoomView}/>
      {/*<Route exact path={'/spectate'} render={() => <SpectateView />} />*/}
    </Switch>
  );
});

export default RootRouter;
