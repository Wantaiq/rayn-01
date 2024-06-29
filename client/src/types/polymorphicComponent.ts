import {
  type ComponentPropsWithoutRef,
  type ElementType,
} from 'react';

type AsProp<E extends ElementType> = {
  as?: E;
};

type PropTypes<E extends ElementType, P> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'>;

type PolymorphicComponent<
  Component extends ElementType,
  Props = Record<string, unknown>,
> = AsProp<Component> & PropTypes<Component, Props>;

export { type PolymorphicComponent };
