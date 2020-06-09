import React from 'react';
import { useForm, FormContext } from 'react-hook-form';

export type FuncArguments<F> = F extends (...args: infer A) => any ? A : any;
export type UseFormResult = ReturnType<typeof useForm>;
export type OnSubmit = FuncArguments<UseFormResult['handleSubmit']>[0];

interface FormProps {
  onSubmit: OnSubmit;
  resetOnSubmit?: boolean;
}

const Form: React.FC<FormProps> = ({ children, onSubmit, resetOnSubmit }) => {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const submit = (data, e) => {
    onSubmit(data, e);
    resetOnSubmit && formMethods.reset();
  };

  return (
    <FormContext {...formMethods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormContext>
  );
};

export default Form;
