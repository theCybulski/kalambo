import React, { ButtonHTMLAttributes } from 'react';

import * as Styled from './ButtonStyles';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IButtonProps> = ({ children, ...props }) => (
  <Styled.Wrapper {...props}>{children}</Styled.Wrapper>
);

export default Button;
