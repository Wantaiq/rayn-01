import type { PolymorphicComponent } from '@/types/';
import type { ElementType, ReactElement } from 'react';

type DefaultAsTag = 'button';
type ValidAsTags = 'button' | 'a';

type ButtonOptions = {
  variant?:
    | 'primary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'plain';
  size?: 'small' | 'medium' | 'large' | 'full' | 'xLarge';
  underline?: boolean;
  rounded?: boolean;
  inline?: boolean;
  disabled?: boolean;
};

type ButtonProps<
  E extends ElementType,
  Props = ButtonOptions,
> = PolymorphicComponent<E, Props>;

type ButtonComponent = <
  E extends ElementType<any, ValidAsTags> = DefaultAsTag,
>(
  props: ButtonProps<E>,
) => ReactElement;

export type { ButtonComponent };
