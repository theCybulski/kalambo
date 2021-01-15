import React from 'react';
import { mountWithMockedStore } from 'utils/tests/testsUtils';

import JoinRoomForm from './JoinRoomForm';

describe(`${JoinRoomForm.name}`, () => {
  it('Renders properly', () => {
    const wrapper = mountWithMockedStore(<JoinRoomForm />);
    const heading = wrapper.find('Heading');
    const nameInput = wrapper.find('[name="name"]').at(0);
    const roomInput = wrapper.find('[name="roomNo"]').at(0);
    const submitBtn = wrapper.find('[type="submit"]').at(0);

    expect(heading.text()).toBe('Join existing room');
    expect(nameInput).toHaveLength(1);
    expect(roomInput).toHaveLength(1);
    expect(submitBtn).toHaveLength(1);
  });
});
