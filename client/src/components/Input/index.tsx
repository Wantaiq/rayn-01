import { cva } from 'class-variance-authority';
import type InputComponent from './Input.types';
import { forwardRef } from 'react';
import type { InputProps } from './Input.types';

const input = cva(
  [
    'block',
    'bg-transparent',
    'text-light',
    'focus:border-b-primary',
    'focus:outline-none',
    'focus:ring-0',
    'peer',
    'order-2',
    'border-0',
    'border-b',
  ],
  {
    variants: {
      full: {
        true: ['w-full'],
      },
      error: {
        true: ['border-b-danger'],
      },
    },
  },
);

const labelClasses = cva(
  ['text-light', 'peer-focus:text-primary', 'order-1'],
  {
    variants: {
      error: {
        true: ['!text-danger'],
      },
    },
  },
);

const wrapperClasses = cva(
  ['flex', 'justify-center', 'gap-1.5', 'w-fit'],
  {
    variants: {
      inline: {
        true: ['flex-row', 'items-center'],
        false: ['flex-col'],
      },
      full: {
        true: ['w-full'],
      },
    },
  },
);

const Input: InputComponent = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      id,
      label,
      className,
      full = false,
      error = false,
      inline = false,
      ...restProps
    },
    ref,
  ) => {
    return (
      <>
        <div className={wrapperClasses({ inline, full })}>
          <input
            ref={ref}
            id={id}
            {...restProps}
            className={input({ className, full, error })}
          />
          {label && (
            <label
              htmlFor={id}
              className={labelClasses({ error })}>
              {label}
            </label>
          )}
        </div>
      </>
    );
  },
);

export default Input;
