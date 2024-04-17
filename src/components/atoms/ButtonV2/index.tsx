import { forwardRef, ReactNode, useContext } from 'react';

import tw, { styled } from 'twin.macro';

import ButtonGroupV2Context from '@/components/molecules/ButtonGroupV2/ButtonGroupV2Context';

import { resolveProps } from '@/utils';

import Loading from '../Loading';

const defaultStyle = tw`flex items-center justify-center h-fit transition-all`;

const variants = {
  primary: tw`border border-nego-800 bg-nego-800 text-white hover:bg-nego-600 hover:border-nego-600 disabled:[background: rgba(112, 72, 232, 0.4)] disabled:border-none`,

  primaryOutline: tw`bg-white border border-nego-800 text-nego-800 hover:[background: rgba(112, 72, 232, 0.05)] disabled:bg-white disabled:[color:rgba(112, 72, 232, 0.4)] disabled:[border-color: rgba(112, 72, 232, 0.4)]`,

  secondary: tw`border border-gray-1000 bg-gray-1000 text-white hover:bg-gray-800 hover:border-gray-800 disabled:[background: rgba(33, 37, 41, 0.4)] disabled:border-none`,

  secondaryOutline: tw`bg-white border border-gray-1000 text-gray-1000 hover:[background: rgba(33, 37, 41, 0.05)] disabled:bg-white disabled:[color: rgba(33, 37, 41, 0.4)] disabled:[border-color: rgba(33, 37, 41, 0.4)]`,

  gray: tw`border border-gray-200 bg-gray-200 text-gray-1000 hover:bg-gray-400 hover:border-gray-400 disabled:[color: rgba(33, 37, 41, 0.4)] disabled:[background: rgba(241, 243, 245, 0.4)] disabled:[border-color: rgba(241, 243, 245, 0.4)]`,

  grayOutline: tw`bg-white border border-gray-300 text-gray-700 hover:[background: rgba(233, 236, 239, 0.2)] disabled:bg-white disabled:[color: rgba(134, 142, 150, 0.4)] disabled:[border-color: rgba(233, 236, 239, 0.4)]`,

  white: tw`border border-white bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-700 disabled:text-gray-700 disabled:[background: rgba(255, 255, 255, 0.4)] disabled:[border-color: rgba(241, 243, 245, 0.4)]`,

  ghost: tw``,
};

const selectedStyles = {
  primary: tw`border border-nego-800 bg-nego-800 hover:bg-nego-800 text-white hover:border-nego-800 hover:text-white`,
  primaryOutline: tw`[background: rgba(112, 72, 232, 0.1)] hover:[background: rgba(112, 72, 232, 0.1)]`,

  secondary: tw`border border-gray-1000 bg-gray-1000 text-white hover:bg-gray-1000 hover:text-white`,
  secondaryOutline: tw`[background: rgba(33, 37, 41, 0.1)] hover:[background: rgba(33, 37, 41, 0.1)]`,

  gray: tw`border border-gray-600 bg-gray-600 text-gray-1000 hover:bg-gray-600 hover:text-gray-1000`,
  grayOutline: tw`[background: rgba(233, 236, 239, 0.5)] text-gray-700 border-gray-300 hover:[background: rgba(233, 236, 239, 0.5)] hover:text-gray-700 hover:border-gray-300`,

  white: tw`border border-gray-200 bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-gray-700`,

  ghost: tw``,
};

const sizes = {
  small: tw`px-4 h-[2rem] text-body_01`,
  medium: tw`px-4 h-[2.5rem] text-body_02`,
  big: tw`px-4 h-[3rem] text-body_02`,
  bigger: tw`px-4 h-[3.5rem] text-body_02`,
  none: tw`text-b2`,
};

const radiuses = {
  none: tw``,
  r8: tw`rounded-lg`,
  r100: tw`[border-radius: 6.25rem]`,
};

export interface ButtonV2Props {
  children?: string | ReactNode;

  variant?:
    | 'primary'
    | 'primaryOutline'
    | 'secondary'
    | 'secondaryOutline'
    | 'gray'
    | 'grayOutline'
    | 'white'
    | 'ghost';
  size?: 'small' | 'medium' | 'big' | 'bigger' | 'none';
  radius?: 'none' | 'r8' | 'r100';
  selected?: boolean;

  id?: string;
  name?: string;
  value?: string | number;
  disabled?: boolean;
  isLoading?: boolean;
  style?: React.CSSProperties;

  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonRoot = styled.button<ButtonV2Props>`
  ${defaultStyle}
  ${({ variant }) => variant && variants[variant]}
  ${({ size }) => size && sizes[size]}
  ${({ radius }) => radius && radiuses[radius]}
  ${({ isLoading }) => isLoading && tw`pointer-events-none`}
  ${({ disabled }) => disabled && tw`pointer-events-none`}
  ${({ selected, variant }) => selected && variant && selectedStyles[variant]}
`;

export default forwardRef<HTMLButtonElement, ButtonV2Props>((inProps, ref) => {
  const contextProps = useContext(ButtonGroupV2Context);
  const resolvedProps = resolveProps(inProps, contextProps);

  const {
    children,
    onClick,
    onMouseDown,
    variant = 'primary',
    size = 'big',
    radius = 'r8',
    disabled = false,
    isLoading = false,
    selected = false,
    value,
    name,
    id,
    style,
    ...others
  } = resolvedProps;

  return (
    <ButtonRoot
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      variant={variant}
      radius={radius}
      size={size}
      isLoading={isLoading}
      selected={selected}
      name={name}
      value={value}
      id={id}
      style={style}
      {...others}
    >
      {isLoading && <Loading size="small" />}
      {!isLoading && children}
    </ButtonRoot>
  );
});
