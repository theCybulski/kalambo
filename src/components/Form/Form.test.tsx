import React from 'react';
import { act } from 'react-dom/test-utils';

import { mountWithTheme } from 'utils/tests/testsUtils';

import Form from './Form';

describe(`${Form.name}`, () => {
  it('Submits a form', async () => {
    const context = {
      defaultProps: {
        onSubmit: jest.fn(),
      },
    };

    const wrapper = mountWithTheme(
      <Form {...context.defaultProps}>
        <input name="testInput" value="Test input value" onChange={jest.fn} />

        <button type="submit">Submit</button>
      </Form>
    );
    const submitBtn = wrapper.find('button');

    await act(async () => {
      submitBtn.simulate('submit');
    });

    wrapper.update();

    expect(context.defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});
