import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import { useFormContext } from 'react-hook-form';

import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  isRequired?: boolean;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, isRequired, className, ...props }, ref) => {
    const { register, errors } = useFormContext();

    return (
      <div className={cn(styles.wrapper, className)}>
        <input
          className={styles.input}
          {...{ name, ...props }}
          ref={register({ required: isRequired })}
        />
        {errors[name] && <span data-cy="input-error">To pole jest wymagane</span>}
      </div>
    );
  },
);
