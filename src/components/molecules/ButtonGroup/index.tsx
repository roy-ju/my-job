import { ButtonProps } from '@/components/atoms/Button';
import { HTMLProps, ReactNode, useMemo } from 'react';
import tw, { css, styled } from 'twin.macro';
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
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      flex-direction: row;
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
    `}
  ${({ orientation }) =>
    orientation === 'vertical' &&
    css`
      flex-direction: column;
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
    `}

  ${({ variant, separated, orientation }) =>
    separated &&
    variant !== 'outlined' &&
    orientation === 'horizontal' &&
    css`
      button:not(:last-of-type) {
        border-right-width: 1px;
        border-color: inherit;
      }
    `}

    ${({ variant, separated, orientation }) =>
    separated &&
    variant !== 'outlined' &&
    orientation === 'vertical' &&
    css`
      button:not(:last-of-type) {
        border-bottom-width: 1px;
        border-color: inherit;
      }
    `}
    
  
  ${({ separated, variant }) =>
    separated && variant && separatorStyles[variant]}



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
        orientation={orientation}
        separated={separated}
        {...others}
      >
        {children}
      </Container>
    </ButtonGroupContext.Provider>
  );
}
