import type {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
} from 'react';

export type InputProps = {
  id?: string;
  label?: string;
  inline?: boolean;
  full?: boolean;
  error?: boolean;
  type?: 'text' | 'password' | 'email';
  className?: string;
} & Omit<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'type'
>;

type InputComponent = FC<InputProps>;

export default InputComponent;
