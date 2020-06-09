import React, { ButtonHTMLAttributes } from 'react';

import * as Styled from './ButtonStyles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Styled.Wrapper {...props}>{children}</Styled.Wrapper>
);

export default Button;
