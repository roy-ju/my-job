import { ButtonProps } from '@/components/atoms/Button';
import { createClassName } from '@/utils';
import { HTMLProps, ReactNode, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import ButtonGroupContext from './ButtonGroupContext';

type Orientaion = 'horizontal' | 'vertical';

export interface ButtonGroupProps
  extends Omit<HTMLProps<HTMLDivElement>, 'size' | 'as'> {
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  separated?: boolean;
  orientation?: Orientaion;
  children?: ReactNode;
}

const separatorStyles = {
  primary: tw`border-gray-800`,
  secondary: tw`border-gray-300`,
  gray: tw`border-gray-500`,
  ghost: tw`border-gray-300`,
  outlined: tw``,
};

const Container = styled.div<{
  orientation: Orientaion;
  separated: boolean;
  variant: ButtonProps['variant'];
}>`
  display: inline-flex;
  ${({ orientation }) => orientation === 'horizontal' && tw`flex-row`}
  ${({ orientation }) => orientation === 'vertical' && tw`flex-col`}
  ${({ separated, variant }) =>
    separated && variant && separatorStyles[variant]}

  &.buttonGroup-horizontal {
    button:not(:first-of-type) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    button:not(:last-of-type) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    button:not(:last-of-type) {
      border-right-width: 0;
    }
  }
  &.buttonGroup-vertical {
    button:not(:first-of-type) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    button:not(:last-of-type) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    button:not(:last-of-type) {
      border-bottom-width: 0;
    }
  }
  &.buttonGroup-separated.buttonGroup-vertical:not(.buttonGroup-outlined) {
    button:not(:last-of-type) {
      border-bottom-width: 1px;
      border-color: inherit;
    }
  }
  &.buttonGroup-separated.buttonGroup-horizontal:not(.buttonGroup-outlined) {
    button:not(:last-of-type) {
      border-right-width: 1px;
      border-color: inherit;
    }
  }
  button:hover {
    border-color: inherit;
  }
`;

export default function ButtonGroup({
  size = 'default',
  variant = 'primary',
  orientation = 'horizontal',
  separated = false,
  children,
  ...others
}: ButtonGroupProps) {
  const className = createClassName(
    'buttonGroup',
    orientation,
    variant ?? '',
    separated ? 'separated' : '',
  );

  const context = useMemo(
    () => ({
      size,
      variant,
    }),
    [size, variant],
  );

  return (
    <ButtonGroupContext.Provider value={context}>
      <Container
        variant={variant}
        className={className}
        orientation={orientation}
        separated={separated}
        {...others}
      >
        {children}
      </Container>
    </ButtonGroupContext.Provider>
  );
}
