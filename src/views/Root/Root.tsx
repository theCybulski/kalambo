import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';

import playerStore from 'store/PlayerStore';
import roomStore from 'store/RoomStore';
import rootStore from 'store/RootStore';

import defaultTheme from 'shared/styles/defaultTheme';
import lightTheme from 'shared/styles/lightTheme';
import GlobalStyles from 'shared/styles/globalStyles';

import RootRouter from 'views/Root/RootRouter';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const Root: React.FC = () => {
  return (
    <Provider {...{ playerStore, roomStore, rootStore }}>
      <ThemeProvider theme={{ ...defaultTheme, ...lightTheme }}>
        <GlobalStyles />
        <Router history={history}>
          <RootRouter />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
