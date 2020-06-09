import styled, { css } from 'styled-components';

export const H = styled.div`
  ${({ variant, theme }) => css`
    align-items: center;
    font-weight: normal;
    margin-bottom: 1em;
    font-size: 20px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: inherit;
      font-weight: inherit;
      letter-spacing: inherit;
      color: inherit;
      margin: 0;
      padding: 0;
    }
  `}
`;
