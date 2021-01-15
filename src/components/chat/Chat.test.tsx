import React from 'react';
import { mount } from 'enzyme';

import { Chat } from './Chat';

jest.mock('api/api');

describe(`${Chat.name}`, () => {
  it('Renders properly with messages', async () => {
    Element.prototype.scrollTo = () => {};
    const wrapper = mount(<Chat />);
    const message = wrapper.find('Message').find('[data-cy="message-content"]').at(0);
    const msgInput = wrapper.find('input[name="message"]');

    expect(message.text()).toBe('Some test message');
    expect(msgInput.length).toBe(1);
  });
});
