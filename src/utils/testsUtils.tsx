import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';

import playerStore from '__mocks__/store/PlayerStore';
import roomStore from '__mocks__/store/RoomStore';
import rootStore from '__mocks__/store/RootStore';

import defaultTheme from 'shared/styles/defaultTheme';
import lightTheme from 'shared/styles/lightTheme';

export const testTheme = { ...defaultTheme, ...lightTheme };

export const mountWithTheme = (component) =>
  mount(<ThemeProvider theme={{ ...testTheme }}>{component}</ThemeProvider>);

export const mountWithMockedStore = (component) =>
  mount(
    <Provider {...{ playerStore, roomStore, rootStore }}>
      <ThemeProvider theme={{ ...testTheme }}>{component}</ThemeProvider>
    </Provider>
  );
