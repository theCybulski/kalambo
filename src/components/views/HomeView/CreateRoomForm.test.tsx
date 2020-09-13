import React from 'react';
import { mountWithMockedStore } from 'utils/tests/testsUtils';

import CreateRoomForm from './CreateRoomForm';

describe(`${CreateRoomForm.name}`, () => {
  it('Renders properly', () => {
    const wrapper = mountWithMockedStore(<CreateRoomForm />);
    const heading = wrapper.find('Heading').at(0);
    const nameInput = wrapper.find('[name="name"]').at(0);
    const submitBtn = wrapper.find('[type="submit"]').at(0);

    expect(heading.text()).toBe('Create new room');
    expect(nameInput).toHaveLength(1);
    expect(submitBtn).toHaveLength(1);
  })
});
