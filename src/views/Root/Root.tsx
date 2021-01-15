import React from 'react';

import RootRouter from 'views/Root/RootRouter';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const Root = () => (
  <Router history={history}>
    <RootRouter />
  </Router>
);

export default Root;
