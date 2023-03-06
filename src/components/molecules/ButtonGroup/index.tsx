import { ButtonProps } from '@/components/atoms/Button';
import { createClassName } from '@/utils';
import type { SerializedStyles } from '@emotion/react';
import { ReactNode, useMemo } from 'react';
import tw, { styled, TwStyle } from 'twin.macro';
import ButtonGroupContext from './ButtonGroupContext';

type Orientaion = 'horizontal' | 'vertical';

export interface ButtonGroupProps {
  size?: ButtonProps['size'];
  theme?: ButtonProps['theme'];
  separated?: boolean;
  orientation?: Orientaion;
  buttonStyle?: TwStyle | string;
  containerStyle?: TwStyle | SerializedStyles;
  children?: ReactNode;
}

const Container = styled.div`
  display: inline-flex;
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

const separatorStyles = {
  primary: tw`border-gray-800`,
  secondary: tw`border-gray-300`,
  gray: tw`border-gray-500`,
  ghost: tw`border-gray-300`,
  outlined: tw``,
};

export default function ButtonGroup({
  size = 'default',
  theme = 'primary',
  orientation = 'horizontal',
  separated = false,
  buttonStyle,
  containerStyle,
  children,
}: ButtonGroupProps) {
  const className = createClassName(
    'buttonGroup',
    orientation,
    theme ?? '',
    separated ? 'separated' : '',
  );

  const context = useMemo(
    () => ({
      size,
      theme,
      buttonStyle,
    }),
    [size, theme, buttonStyle],
  );

  return (
    <ButtonGroupContext.Provider value={context}>
      <Container
        className={className}
        css={[
          orientation === 'horizontal' && tw`flex-row`,
          orientation === 'vertical' && tw`flex-col`,
          separated && separatorStyles[theme],
          containerStyle,
        ]}
      >
        {children}
      </Container>
    </ButtonGroupContext.Provider>
  );
}
