import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./ButtonIcon.module.scss";

export enum BUTTON_ICON_VARIANTS {
  BRUSH = "brush",
  ERASER = "eraser",
  CLEAR = "clear"
}

export interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant: BUTTON_ICON_VARIANTS
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({ variant, isActive, children, ...props }) => {
  return (
    <button
      className={cn(
        styles.wrapper,
        { [styles.isActive]: isActive }
      )}
      {...props}
    >
      <div className={cn(styles.icon, styles[variant])} />
      {children && <span>{children}</span>}
    </button>
  );
};
