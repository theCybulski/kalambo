import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  max-height: 500px;
  flex-shrink: 0;
  overflow: auto;
  padding: 10px 10px 0;
`;

export const InputContainer = styled.div`
  padding: 10px;
`;
