import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
  
  * { box-sizing: border-box; }

  button {
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    &:focus{
        outline: none;
    }
  }

  body {
    position: relative;
  }

  html {
    font-family: "Mukta", sans-serif;
    font-weight: 400;
    overflow-x: hidden;
  }

  a, button, p {
    font-family: 'Mukta', sans-serif;
    font-size: 16px;
    line-height: 1.3em;
    font-weight: 400;
  }
  
  input {
    font-family: 'Mukta', sans-serif;
    font-size: 16px;
    line-height: 1.3em;
    font-weight: 300;
  }
  
  a {
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
  }
`;

export default React.memo(GlobalStyles);
