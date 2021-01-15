import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './ButtonIcon.module.scss';

export enum BUTTON_ICON_VARIANTS {
  BRUSH = 'brush',
  ERASER = 'eraser',
  CLEAR = 'clear',
  SCORE_BOARD = 'scoreBoard',
  SETTINGS = 'settings'
}

export interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant: BUTTON_ICON_VARIANTS;
  className?: string;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  variant,
  isActive,
  children,
  className,
  ...props
}) => (
  <button
    type="button"
    className={cn(
      styles.wrapper,
      { [styles.isActive]: isActive },
      className,
    )}
    {...props}
  >
    <div className={cn(styles.icon, styles[variant])} />
    {children && <span className={styles.label}>{children}</span>}
  </button>
);
