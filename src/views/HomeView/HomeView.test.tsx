import React from 'react';
import toJson from 'enzyme-to-json';

import { shallow } from 'enzyme';

import HomeView from './HomeView';

describe(`${HomeView.name}`, () => {
  it('Matches snapshot', () => {
    const wrapper = shallow(<HomeView />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
