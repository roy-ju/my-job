import { HTMLProps, ReactNode, useMemo } from 'react';

import { ButtonV2Props } from '@/components/atoms/ButtonV2';

import tw, { css, styled } from 'twin.macro';

import ButtonGroupV2Context from './ButtonGroupV2Context';

type Orientaion = 'horizontal' | 'vertical';

export interface ButtonGroupV2Props extends Omit<HTMLProps<HTMLDivElement>, 'size' | 'as'> {
  size?: ButtonV2Props['size'];
  variant?: ButtonV2Props['variant'];
  separated?: boolean;
  orientation?: Orientaion;
  children?: ReactNode;
}

const separatorStyles = {
  primary: tw`border-gray-800`,
  primaryOutline: tw`border-gray-800`,

  secondary: tw`border-gray-300`,
  secondaryOutline: tw`border-gray-300`,

  gray: tw`border-gray-500`,
  grayOutline: tw`border-gray-500`,

  white: tw`border-white`,

  ghost: tw`border-gray-300`,
};

const Container = styled.div<{
  orientation: Orientaion;
  separated: boolean;
  variant: ButtonV2Props['variant'];
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
    variant !== 'primaryOutline' &&
    variant !== 'secondaryOutline' &&
    variant !== 'grayOutline' &&
    orientation === 'horizontal' &&
    css`
      button:not(:last-of-type) {
        border-right-width: 1px;
        border-color: inherit;
      }
    `}

    ${({ variant, separated, orientation }) =>
    separated &&
    variant !== 'primaryOutline' &&
    variant !== 'secondaryOutline' &&
    variant !== 'grayOutline' &&
    orientation === 'vertical' &&
    css`
      button:not(:last-of-type) {
        border-bottom-width: 1px;
        border-color: inherit;
      }
    `}
    
  
  ${({ separated, variant }) => separated && variant && separatorStyles[variant]}

  button:hover {
    border-color: inherit;
  }
`;

export default function ButtonGroup({
  size = 'big',
  variant = 'primary',
  orientation = 'horizontal',
  separated = false,
  children,
  ...others
}: ButtonGroupV2Props) {
  const context = useMemo(
    () => ({
      size,
      variant,
    }),
    [size, variant],
  );

  return (
    <ButtonGroupV2Context.Provider value={context}>
      <Container variant={variant} orientation={orientation} separated={separated} {...others}>
        {children}
      </Container>
    </ButtonGroupV2Context.Provider>
  );
}
