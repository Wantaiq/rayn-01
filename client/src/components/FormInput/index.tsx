import { Input } from '@/components';
import type { FormInputComponent } from './FormInput.types';

const FormInput: FormInputComponent = ({
  name,
  register,
  rules,
  errors,
  ...restProps
}) => {
  const errorMessage = errors && errors[name];
  const hasErrors = errors && errorMessage ? true : false;

  return (
    <>
      <Input
        {...restProps}
        {...register(name, rules)}
        name={name}
        aria-invalid={hasErrors}
        error={hasErrors}
      />
      {hasErrors && (
        <p className='text-red-500'>
          {errorMessage?.message}
        </p>
      )}
    </>
  );
};

export default FormInput;
