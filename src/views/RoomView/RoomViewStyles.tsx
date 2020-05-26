import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: rgba(${theme.colors.secondaryFill}, 1);
    height: 100vh;
    padding: 25px 50px 40px;
  `}
`;

export const FlipChartWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 9;
`;

export const SideElementsWrapper = styled.div`
  grid-column-start: 9;
  grid-column-end: 13;
`;

export const Card = styled.div`
  ${({ theme, corners }) => css`
    background-color: rgba(${theme.colors.primaryFill}, 1);
    box-shadow: ${theme.shadows.primary};
    border-radius: ${corners};
    overflow: hidden;
    width: 100%;
  `}
`;

export const CardFlipChart = styled(Card)`
  height: 100%;
`;

export const CardChat = styled(Card)`
  height: 70%;
`;

export const CardControls = styled(Card)`
  height: calc(30% - 20px);
  margin-top: 20px;
`;

export const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(12, 1fr);
`;
