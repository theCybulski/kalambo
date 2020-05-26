import React, { InputHTMLAttributes } from 'react';

import * as Styled from './InputStyles';

export interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputTypes> = ({ ...props }) => (
  <Styled.Wrapper>
    <Styled.Input {...props} />
  </Styled.Wrapper>
);

export default Input;
