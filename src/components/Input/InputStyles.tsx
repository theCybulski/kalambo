import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  position: relative;
  padding: 12px 15px 10px;
  border-radius: 15px;
  width: 100%;
  border: none;
  background: ${({ theme }) => `rgba(${theme.colors.additional}, 0.05)`};
  z-index: 1;
  color: rgba(0, 0, 0, 0.5);

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
  }
`;
