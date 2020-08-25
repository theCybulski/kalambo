import React from 'react';
import { ReactWrapper } from 'enzyme';

import { mountWithMockedStore, testTheme } from 'utils/testsUtils';

import Chat from './Chat';

xdescribe(`${Chat.name}`, () => {
  it('Renders properly', () => {
    const wrapper = mountWithMockedStore(<Chat />);

    console.log(wrapper.debug());
  });
});
