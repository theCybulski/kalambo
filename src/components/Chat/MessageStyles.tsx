import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Avatar = styled.img`
  content: '';
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: red;
  margin-right: 5px;
`;

export const MessageWrapper = styled.div`
  flex: 1;

  ${({ alignRight }) =>
    alignRight &&
    css`
      text-align: right;
    `}
`;

export const Message = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.fonts.size.regular};
    font-weight: ${theme.fonts.weight.light};
    line-height: 1.3em;
    background-color: rgba(${theme.colors.additional}, 0.1);
    padding: 6px 12px;
    width: auto;
    max-width: 75%;
    display: inline-block;
    border-radius: 20px 20px 20px 10px;
  `};

  ${({ theme, isLocalPlayer }) =>
    isLocalPlayer &&
    css`
      background-color: rgba(${theme.colors.primaryColor}, 1);
      color: rgba(${theme.colors.primaryFill}, 1);
      border-radius: 20px 20px 10px 20px;
    `};
`;

export const Sender = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.fonts.size.small};
    font-weight: ${theme.fonts.weight.regular};
    line-height: 1.3em;
    color: rgba(${theme.colors.additional}, 1);
    opacity: 0.35;
    margin: 0 0 5px 10px;
  `}
`;
