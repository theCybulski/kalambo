import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';

import { PlayerStore } from 'store/PlayerStore';
import { RoomStore } from 'store/RoomStore';
import { RootStore } from 'store/RootStore';

import defaultTheme from 'shared/styles/defaultTheme';
import lightTheme from 'shared/styles/lightTheme';
import GlobalStyles from 'shared/styles/globalStyles';

import RootRouter from 'views/Root/RootRouter';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const playerStore = new PlayerStore();
const roomStore = new RoomStore();
const rootStore = new RootStore();

const history = createBrowserHistory();
const Root: React.FC = () => {
  return (
    <Provider {...{ playerStore, roomStore, rootStore }}>
      <ThemeProvider theme={{ ...defaultTheme, ...lightTheme }}>
        <Router history={history}>
          <RootRouter />
        </Router>
        <GlobalStyles />
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
