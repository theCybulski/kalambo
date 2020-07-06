import React from 'react';
import toJson from 'enzyme-to-json';
import { mountWithTheme } from 'utils/testsUtils';

import Button from './Button';

describe(`${Button.name}`, () => {
  it('Renders properly with any props', () => {
    const button = mountWithTheme(<Button type="submit">Test button</Button>);
    expect(toJson(button)).toMatchSnapshot();
  });

  it('Accepts various children', () => {
    const button = mountWithTheme(<Button>Test button</Button>);
    const button2 = mountWithTheme(
      <Button>
        <span>Another test button</span>
      </Button>
    );

    expect(button.text()).toBe('Test button');
    expect(button2.find('span')).toBeTruthy();
    expect(button2.find('span').text()).toBe('Another test button');
  });

  it('Calls onClick event', () => {
    const onClick = jest.fn();
    const button = mountWithTheme(<Button onClick={onClick}>Test button</Button>);

    button.simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
