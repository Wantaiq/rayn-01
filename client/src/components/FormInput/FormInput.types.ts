import type {
  UseFormRegister,
  Path,
  FieldValues,
  RegisterOptions,
  DeepMap,
} from 'react-hook-form';
import type { InputProps } from '../Input/Input.types';

type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldValues>>;
} & Omit<InputProps, 'name'>;

type FormInputComponent = <TFormValues extends FieldValues>(
  props: FormInputProps<TFormValues>,
) => JSX.Element;

export type { FormInputComponent };
