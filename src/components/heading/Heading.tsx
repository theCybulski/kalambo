import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Heading.module.scss';

export enum headingVariant {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as: headingVariant;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  as,
  children,
  className,
  ...rest
}) => {
  const renderHeading = () => {
    switch (as) {
      case headingVariant.h1:
        return <h1 className={cn(styles.wrapper, className)} {...rest}>{children}</h1>;
      case headingVariant.h2:
        return <h2 className={cn(styles.wrapper, className)} {...rest}>{children}</h2>;
      case headingVariant.h3:
        return <h3 className={cn(styles.wrapper, className)} {...rest}>{children}</h3>;
      case headingVariant.h4:
        return <h4 className={cn(styles.wrapper, className)} {...rest}>{children}</h4>;
      case headingVariant.h5:
        return <h5 className={cn(styles.wrapper, className)} {...rest}>{children}</h5>;
      case headingVariant.h6:
        return <h6 className={cn(styles.wrapper, className)} {...rest}>{children}</h6>;
      default:
        return <h1 className={cn(styles.wrapper, className)} {...rest}>{children}</h1>;
    }
  };

  return renderHeading();
};

export default Heading;
