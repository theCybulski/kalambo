import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Form } from '../form/Form';
import { Input, InputProps } from './Input';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: () => ({
    register: jest.fn(),
    errors: { testInput: {} },
  }),
}));
xdescribe(`${Input.name}`, () => {
  let mountWithProps: (props: InputProps) => ReactWrapper;

  beforeEach(() => {
    mountWithProps = props =>
      mount(
        <Form onSubmit={jest.fn()}>
          <Input {...props} />
        </Form>,
      );
  });

  it('Renders properly with name prop', () => {
    const wrapper = mountWithProps({ name: 'testInput' });

    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').prop('name')).toBe('testInput');
  });

  it('Renders properly with an error', () => {
    const wrapper = mountWithProps({ name: 'testInput' });
    const errorMessage = wrapper.find('[name="testInput"]').find('span');

    expect(errorMessage.text()).toBe('This field is required');
  });

  it('Renders properly with a value', () => {
    const wrapper = mountWithProps({ value: 'Test value', onChange: jest.fn() });

    expect(wrapper.find('input').prop('value')).toBe('Test value');
  });
});
