import styled, { css } from 'styled-components';

export const Wrapper = styled.header`
  width: 100%;
  padding: 0 0 15px;
`;

export const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(12, 1fr);
`;

export const InfoWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ControlsWrapper = styled.div`
  grid-column-start: 9;
  grid-column-end: 12;
`;

export const Info = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.fonts.size.medium};

    span {
      display: block;
      font-size: ${theme.fonts.size.small};
      font-weight: ${theme.fonts.weight.regular};
      color: rgba(${theme.colors.additional}, 0.5);
      margin-top: 5px;
    }
  `}
`;

export const Timer = styled.h3`
  ${({ theme }) => css`
    text-align: right;
    font-size: ${theme.fonts.size.medium};
  `}
`;
