import styled, { css } from 'styled-components';

export const Wrapper = styled.button`
  ${({ theme }) => css`
    position: relative;
    background-color: rgba(${theme.colors.primaryColor}, 1);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px 15px;
    cursor: pointer;
    align-items: center;
  `};
`;
