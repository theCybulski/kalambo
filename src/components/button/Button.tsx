import React, { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

export type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<IButtonProps> = ({
  type = 'button',
  children,
  ...props
}) => (
  <button
    className={styles.wrapper}
    {...{ type, ...props }}
  >
    {children}
  </button>
);
