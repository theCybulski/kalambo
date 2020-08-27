import React from 'react';
import { ReactWrapper } from 'enzyme';
import { mountWithTheme } from 'utils/tests/testsUtils';

import Heading, { headingVariant } from './Heading';

describe(`${Heading.name}`, () => {
  it('Renders properly with different variants', () => {
    Object.values(headingVariant).forEach((variant) => {
      const wrapper: ReactWrapper = mountWithTheme(<Heading as={headingVariant[variant]}>Test heading</Heading>);

      const heading = wrapper.find(headingVariant[variant])

      expect(heading.length).toBe(1);
      expect(heading.text()).toBe('Test heading');
    });
  });
});
