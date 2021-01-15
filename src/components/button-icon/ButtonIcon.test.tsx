import React from 'react';
import { mountWithTheme } from 'utils/tests/testsUtils';

import IconBrush from 'components/button-icon/assets/icon-brush.svg';
import { BUTTON_ICON_VARIANTS, ButtonIcon, ButtonIconProps } from './ButtonIcon';

describe(`${ButtonIcon.name}`, () => {
  let context: { defaultProps: ButtonIconProps };
  let wrapper: any;

  beforeEach(() => {
    context = {
      defaultProps: {
        variant: BUTTON_ICON_VARIANTS.BRUSH,
        isActive: false,
        onClick: jest.fn(),
      },
    };

    wrapper = mountWithTheme(<ButtonIcon {...context.defaultProps} />).find('ButtonIcon');
  });

  it('Renders properly with default props', () => {
    expect(wrapper.props().isActive).toBe(false);
    expect(wrapper.props().icon).toBe(IconBrush);
  });

  it('Accepts children', () => {
    const wrapper2 = mountWithTheme(
      <ButtonIcon {...context.defaultProps}>Some label</ButtonIcon>,
    ).find('ButtonIcon');

    expect(wrapper2.text()).toBe('Some label');
  });

  it('Calls onClick event', () => {
    wrapper.simulate('click');

    expect(context.defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
