import React from 'react';
import toJson from 'enzyme-to-json';
import { mountWithTheme } from 'utils/testsUtils';

import ButtonIcon from './ButtonIcon';
import IconBrush from 'assets/icons/IconBrush.svg';

describe(`${ButtonIcon.name}`, () => {
  let context: any;
  let component: any;

  beforeEach(() => {
    context = {
      defaultProps: {
        icon: IconBrush,
        isActive: false,
        onClick: jest.fn(),
      },
    };

    component = mountWithTheme(<ButtonIcon {...context.defaultProps} />).find(ButtonIcon);
  });

  it('Renders properly with default props', () => {
    expect(component.props().isActive).toBe(false);
    expect(component.props().icon).toBe(IconBrush);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('Accepts children', () => {
    const component2 = mountWithTheme(
      <ButtonIcon {...context.defaultProps}>Some label</ButtonIcon>
    ).find(ButtonIcon);

    expect(component2.text()).toBe('Some label');
  });

  it('Calls onClick event', () => {
    component.simulate('click');

    expect(context.defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
