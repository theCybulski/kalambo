import styled, { css } from 'styled-components';

export const Icon = styled.div`
  ${({ theme, icon, isActive }) => css`
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    mask-image: url(${icon});
    mask-size: contain;
    background-color: rgba(${theme.colors.additional}, 1);
    opacity: 0.5;
    transition: opacity 0.2s ease-out;

    ${isActive &&
    css`
      opacity: 1;
      background-color: rgba(${theme.colors.secondaryColor}, 1);
    `}
  `}
`;

export const Label = styled.span`
  ${({ theme, isActive }) => css`
    margin-left: 10px;
    font-size: ${theme.colors.additional};
    opacity: 0.6;

    ${isActive &&
    css`
      opacity: 1;
    `}
  `}
`;

export const Wrapper = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    ${Icon} {
      opacity: 1;
    }

    ${Label} {
      opacity: 1;
    }
  }
`;
