import React from "react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "shared/styles/defaultTheme";
import lightTheme from "shared/styles/lightTheme";
import GlobalStyles from "shared/styles/globalStyles";

import RootRouter from "views/Root/RootRouter";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const Root: React.FC = () => {
  return (
    <ThemeProvider theme={{ ...defaultTheme, ...lightTheme }}>
      <Router history={history}>
        <RootRouter/>
      </Router>
      <GlobalStyles/>
    </ThemeProvider>
  );
};

export default Root;
