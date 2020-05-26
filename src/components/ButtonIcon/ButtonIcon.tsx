import React, { ButtonHTMLAttributes } from 'react';

import * as Styled from './ButtonIconStyles';

export interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  isActive?: boolean;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, isActive, children, ...props }) => (
  <Styled.Wrapper {...props}>
    <Styled.Icon icon={icon} isActive={isActive} />
    {children && <Styled.Label isActive={isActive}>{children}</Styled.Label>}
  </Styled.Wrapper>
);

export default ButtonIcon;
