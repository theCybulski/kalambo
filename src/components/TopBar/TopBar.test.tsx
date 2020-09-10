import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { mountWithMockedStore } from 'utils/tests/testsUtils';

import TopBar from './TopBar';
import { act } from 'react-dom/test-utils';

xdescribe(`${TopBar.name}`, () => {
  it('Sets player ready', async () => {
    const wrapper = mountWithMockedStore(<TopBar />);
    const btnReady = wrapper.find('[data-test-id="btn-ready"]');

    expect(btnReady.text()).toBe('Ready');

    await act(async () => {
      btnReady.props().onClick;
      // wrapper.find('MobXProvider').props().playerStore.setPlayerReady(true)
    });

    wrapper.update();

    console.log(wrapper.find('[data-test-id="btn-ready"]').debug());
  });
});
