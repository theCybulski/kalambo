import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import defaultTheme from 'shared/styles/defaultTheme';
import lightTheme from 'shared/styles/lightTheme';

export const mountWithTheme = (component) =>
  mount(<ThemeProvider theme={{ ...defaultTheme, ...lightTheme }}>{component}</ThemeProvider>);
