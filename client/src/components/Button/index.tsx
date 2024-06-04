import { cva } from 'class-variance-authority';
import type { ButtonComponent } from './Button.types';

const button = cva(['text-light', 'border', 'block'], {
  variants: {
    variant: {
      primary: [
        'bg-primary',
        'hover:bg-primary-400',
        'border-primary',
        'hover:border-primary-400',
      ],
      danger: [
        'bg-danger',
        'hover:bg-danger-400',
        'border-danger',
        'hover:border-danger-400',
      ],
      warning: [
        'bg-warning',
        'hover:bg-warning-400',
        'border-warning',
        'hover:border-warning-400',
      ],
      success: [
        'bg-success',
        'hover:bg-success-400',
        'border-success',
        'hover:border-success-400',
      ],
      plain: ['border-0'],
    },
    size: {
      small: ['px-2', 'py-0.5'],
      medium: ['px-3', 'py-1.5', 'text-base'],
      large: ['px-4', 'py-1.5', 'text-xl'],
      full: ['w-full'],
    },
    underline: {
      true: ['underline'],
      false: [],
    },
    rounded: {
      true: ['rounded'],
      false: [],
    },
    inline: {
      true: ['inline-block'],
      false: [],
    },
    disabled: {
      true: [],
      false: [],
    },
  },
  compoundVariants: [
    {
      variant: ['primary', 'danger', 'warning', 'success'],
      disabled: true,
      className: '!bg-gray !border-gray',
    },
    {
      variant: 'plain',
      disabled: true,
      className: 'text-gray bg-transparent',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    underline: false,
    rounded: true,
    disabled: false,
  },
});

const Button: ButtonComponent = ({
  as: Component = 'button',
  className,
  children,
  variant,
  size,
  underline,
  rounded,
  inline,
  disabled = false,
  ...restProps
}) => {
  return (
    <Component
      className={button({
        variant,
        size,
        underline,
        rounded,
        inline,
        disabled,
        className,
      })}
      disabled={disabled}
      {...restProps}>
      {children}
    </Component>
  );
};

export default Button;
