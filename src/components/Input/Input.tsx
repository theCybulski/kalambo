import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import * as Styled from './InputStyles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ error, name, ...props }, ref) => {
  const { register, errors } = useFormContext();

  return (
    <Styled.Wrapper>
      <Styled.Input {...props} name={name} ref={register({ required: true })} />
      {errors.name && <span>This field is required</span>}
    </Styled.Wrapper>
  );
});

export default Input;
