import React from 'react';
import { useForm, FormContext } from 'react-hook-form';

export type FuncArguments<F> = F extends (...args: infer A) => any ? A : any;
export type UseFormResult = ReturnType<typeof useForm>;
export type OnSubmit = FuncArguments<UseFormResult['handleSubmit']>[0];

export interface FormProps {
  onSubmit: OnSubmit;
  resetOnSubmit?: boolean;
  dataCy?: string;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, resetOnSubmit, dataCy }) => {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const submit = (data, e) => {
    onSubmit(data, e);
    resetOnSubmit && formMethods.reset();
  };

  return (
    <FormContext {...formMethods}>
      <form onSubmit={handleSubmit(submit)} data-cy={dataCy}>
        {children}
      </form>
    </FormContext>
  );
};
