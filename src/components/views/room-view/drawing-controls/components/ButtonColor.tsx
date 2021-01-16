import React from 'react';
import cn from 'classnames';

import styles from './ButtonColor.module.scss';

export type ButtonColorProps = {
  color: string;
  onClick: (color: string) => void;
  currentColor: string;
}

export const ButtonColor = ({ color, onClick, currentColor }: ButtonColorProps) => {
  const handleClick = () => {
    onClick(color);
  };

  return (
    <button
      style={{ backgroundColor: color }}
      className={cn(styles.wrapper, { [styles.isActive]: currentColor === color })}
      type="button"
      onClick={handleClick}
    />
  );
};
