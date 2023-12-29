import React, { forwardRef, ReactNode } from 'react';

import tw, { styled } from 'twin.macro';

import { resolveProps } from '@/utils';

import Loading from '../Loading';

const defaultStyle = tw`flex items-center justify-center h-fit transition-all`;

const variants = {
  primary: tw`border-none bg-nego-800 text-white hover:bg-nego-600 disabled:[background: rgba(112, 72, 232, 0.4)]`,
  primaryOutline: tw`bg-white border border-nego-800 text-nego-800 hover:[background: rgba(112, 72, 232, 0.05)] disabled:bg-white disabled:[color:rgba(112, 72, 232, 0.4)] disabled:[border-color: rgba(112, 72, 232, 0.4)]`,

  secondary: tw`border-none bg-gray-1000 text-white hover:bg-gray-800 disabled:[background: rgba(33, 37, 41, 0.4)]`,
  secondaryOutline: tw`bg-white border border-gray-1000 text-gray-1000 hover:[background: rgba(33, 37, 41, 0.05)] disabled:bg-white disabled:[color: rgba(33, 37, 41, 0.4)] disabled:[border-color: rgba(33, 37, 41, 0.4)]`,

  gray: tw`border-none bg-gray-200 text-gray-1000 hover:bg-gray-400 disabled:[color: rgba(33, 37, 41, 0.4)] disabled:[background: rgba(241, 243, 245, 0.4)]`,
  grayOutline: tw`bg-white border border-gray-300 text-gray-700 hover:[background: rgba(233, 236, 239, 0.2)] disabled:bg-white disabled:[color: rgba(134, 142, 150, 0.4)] disabled:[border-color: rgba(233, 236, 239, 0.4)]`,

  ghost: tw``,
};

const selectedStyles = {
  primary: tw`bg-nego-800 hover:bg-nego-800 text-white hover:text-white`,
  primaryOutline: tw`[background: rgba(112, 72, 232, 0.1)] hover:[background: rgba(112, 72, 232, 0.1)]`,

  secondary: tw`bg-gray-1000 text-white hover:bg-gray-1000 hover:text-white`,
  secondaryOutline: tw`[background: rgba(33, 37, 41, 0.1)] hover:[background: rgba(33, 37, 41, 0.1)]`,

  gray: tw`bg-gray-600 text-gray-1000 hover:bg-gray-600 hover:text-gray-1000`,
  grayOutline: tw`[background: rgba(233, 236, 239, 0.5)] text-gray-700 border-gray-300 hover:[background: rgba(233, 236, 239, 0.5)] hover:text-gray-700 hover:border-gray-300`,

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

interface ButtonProps {
  /** 버튼 안의 내용 */
  children?: string | ReactNode;
  /** 클릭 했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 테마 */
  variant?: 'primary' | 'primaryOutline' | 'secondary' | 'secondaryOutline' | 'gray' | 'grayOutline' | 'ghost';
  /** 버튼 사이즈 */
  size?: 'small' | 'medium' | 'big' | 'bigger' | 'none';
  /** 버튼 radius */
  radius?: 'none' | 'r8' | 'r100';
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 선택되었는지 여부 */
  selected?: boolean;
  value?: string | number;
  id?: string;
  name?: string;
  style?: React.CSSProperties;
}

const ButtonRoot = styled.button<ButtonProps>`
  ${defaultStyle}
  ${({ variant }) => variant && variants[variant]}
  ${({ size }) => size && sizes[size]}
  ${({ radius }) => radius && radiuses[radius]}
  ${({ isLoading }) => isLoading && tw`pointer-events-none`}
  ${({ disabled }) => disabled && tw`pointer-events-none`}
  ${({ selected, variant }) => selected && variant && selectedStyles[variant]}
`;

export default forwardRef<HTMLButtonElement, ButtonProps>((inProps, ref) => {
  const resolvedProps = resolveProps(inProps, {});

  const {
    children,
    onClick,
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
