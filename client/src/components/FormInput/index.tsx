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
    <div className='flex flex-col space-y-1 items-center justify-center'>
      <Input
        {...restProps}
        {...register(name, rules)}
        name={name}
        aria-invalid={hasErrors}
        error={hasErrors}
      />
      <div className='h-5 self-start'>
        {hasErrors && (
          <p className='text-red-500 text-sm leading-tight h-5'>
            {errorMessage?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormInput;
