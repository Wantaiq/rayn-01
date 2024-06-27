import type { PolymorphicComponent } from '@/types/';
import type { ElementType, ReactElement } from 'react';
import { Link } from 'react-router-dom';

type DefaultAsTag = 'button';
type ValidAsTags = 'button' | 'a';

type ButtonOptions = {
  variant?:
    | 'primary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'plain';
  size?:
    | 'small'
    | 'medium'
    | 'large'
    | 'full'
    | 'xLarge'
    | 'neutral';
  underline?: boolean;
  rounded?: boolean;
  inline?: boolean;
  disabled?: boolean;
};

type ButtonProps<
  E extends ElementType | typeof Link,
  Props = ButtonOptions,
> = PolymorphicComponent<E, Props>;

type ButtonComponent = <
  E extends ElementType<any, ValidAsTags> =
    | DefaultAsTag
    | typeof Link,
>(
  props: ButtonProps<E>,
) => ReactElement;

export type { ButtonComponent };
