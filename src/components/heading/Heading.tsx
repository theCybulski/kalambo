import React, { HTMLAttributes } from 'react';

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
}

const Heading: React.FC<HeadingProps> = ({ as, children, ...rest }) => {
  const renderHeading = () => {
    switch (as) {
      case headingVariant.h1:
        return <h1 {...rest}>{children}</h1>;
      case headingVariant.h2:
        return <h2 {...rest}>{children}</h2>;
      case headingVariant.h3:
        return <h3 {...rest}>{children}</h3>;
      case headingVariant.h4:
        return <h4 {...rest}>{children}</h4>;
      case headingVariant.h5:
        return <h5 {...rest}>{children}</h5>;
      case headingVariant.h6:
        return <h6 {...rest}>{children}</h6>;
      default:
        return <h1 {...rest}>{children}</h1>;
    }
  };

  return <div className={styles.wrapper}>{renderHeading()}</div>;
};

export default Heading;
