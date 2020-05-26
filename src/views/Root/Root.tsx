import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';

import { rootStore } from 'store/RootStore';
import { chatStore } from 'store/ChatStore';
import { playersStore } from 'store/PlayersStore';

import defaultTheme from 'shared/styles/defaultTheme';
import lightTheme from 'shared/styles/lightTheme';
import GlobalStyles from 'shared/styles/globalStyles';

import RootRouter from 'views/Root/RootRouter';

const Root: React.FC = () => {
  return (
    <Provider rootStore={rootStore} playersStore={playersStore} chatStore={chatStore}>
      <ThemeProvider theme={{ ...defaultTheme, ...lightTheme }}>
        <GlobalStyles />
        <RootRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
