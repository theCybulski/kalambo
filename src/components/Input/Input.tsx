import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import * as Styled from './InputStyles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  isRequired?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, isRequired, ...props }, ref) => {
    const { register, errors } = useFormContext();

    return (
      <Styled.Wrapper>
        <Styled.Input {...props} name={name} ref={register({ required: isRequired })} />
        {errors[name] && <span data-cy="input-error">This field is required</span>}
      </Styled.Wrapper>
    );
  }
);

export default Input;
