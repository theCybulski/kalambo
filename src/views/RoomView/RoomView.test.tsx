import React from 'react';
import { Provider } from 'mobx-react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import toJson from 'enzyme-to-json';

import playerStore from 'store/__mocks__/PlayerStore';
import roomStore from 'store/__mocks__/RoomStore';
import rootStore from 'store/__mocks__/RootStore';
import { testTheme } from 'utils/tests/testsUtils';

import RoomView from './RoomView';

describe(`${RoomView.name}`, () => {
  it('Matches snapshot', () => {
    const wrapper = shallow(
      <Provider {...{ playerStore, roomStore, rootStore }}>
        <ThemeProvider theme={{ ...testTheme }}>
          <RoomView />
        </ThemeProvider>
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
