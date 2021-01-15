import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BUTTON_VARIANTS;
}

export enum BUTTON_VARIANTS {
  PURPLE = 'purple',
  ORANGE = 'orange'
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  variant = BUTTON_VARIANTS.PURPLE,
  ...props
}) => (
  <button
    className={cn(
      styles.wrapper,
      styles[variant],
    )}
    {...{ type, ...props }}
  >
    {children}
  </button>
);
