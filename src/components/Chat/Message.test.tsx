import React from 'react';
import { ReactWrapper } from 'enzyme';

import { mountWithTheme, testTheme } from 'utils/testsUtils';

import Message, { MessageProps } from './Message';

const mountMessageWithProps = (props: MessageProps) => {
  const wrapper: ReactWrapper = mountWithTheme(<Message {...props} />);

  const msgWrapper = wrapper.find('[data-test="message-wrapper"]').at(0);
  const sender = wrapper.find('[data-test="message-sender"]').at(0);
  const message = wrapper.find('[data-test="message-content"]').at(0);
  const avatar = wrapper.find('[data-test="message-avatar"]').find('img');

  return {
    wrapper,
    msgWrapper,
    sender,
    message,
    avatar,
  };
};

describe(`${Message.name}`, () => {
  it('renders properly for remote player, incorrect message, with avatar', () => {
    const { msgWrapper, sender, message, avatar } = mountMessageWithProps({
      player: 'Test player',
      avatar: 'https://picsum.photos/100/100',
      message: 'Test message',
      isCorrect: false,
      isLocalPlayer: false,
    });

    expect(avatar.props().src).toBe('https://picsum.photos/100/100');
    expect(sender.text()).toBe('Test player');
    expect(msgWrapper).toHaveStyleRule('text-align', undefined);

    expect(message.text()).toBe('Test message');
    expect(message).toHaveStyleRule('background-color', `rgba(${testTheme.colors.additional},0.1)`);
  });

  it('renders properly for local player, correct message, no avatar', () => {
    const { msgWrapper, sender, message, avatar } = mountMessageWithProps({
      player: 'Test local player',
      avatar: '',
      message: 'Test message',
      isCorrect: true,
      isLocalPlayer: true,
    });

    expect(avatar.length).toEqual(0);
    expect(sender.length).toEqual(0);
    expect(msgWrapper).toHaveStyleRule('text-align', 'right');

    expect(message.text()).toBe('Test message');
    expect(message).toHaveStyleRule(
      'background-color',
      `rgba(${testTheme.colors.secondaryColor},1)`
    );
  });
});
