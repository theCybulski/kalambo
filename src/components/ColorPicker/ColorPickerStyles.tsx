import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SaturationWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
`;

export const HueWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 10px;
  overflow: hidden;
`;

export const SaturationPointer = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  box-shadow: rgb(255, 255, 255) 0 0 0 1px inset;
  transform: translate(-6px, -6px);
`;
export const HuePointer = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  transform: translate(-6px, -1px);
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(${({ theme }) => theme.colors.additional}, 0.37) 0 1px 3px;
`;
