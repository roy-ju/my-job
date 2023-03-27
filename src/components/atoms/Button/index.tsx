import React, { forwardRef, ReactNode, useContext } from 'react';
import tw, { styled } from 'twin.macro';
import ButtonGroupContext from '@/components/molecules/ButtonGroup/ButtonGroupContext';
import { resolveProps } from '@/utils';
import Loading from '../Loading';

const defaultStyle = tw`flex items-center justify-center h-fit rounded-lg transition-colors`;

const variants = {
  primary: tw`text-white bg-gray-1000 hover:bg-gray-800 disabled:bg-gray-400 disabled:text-white`,
  secondary: tw`text-white bg-nego-800 hover:bg-nego-600 disabled:bg-nego-300 disabled:text-white`,
  gray: tw`text-gray-1000 bg-gray-200 hover:bg-gray-400 disabled:bg-gray-200`,
  outlined: tw`bg-white border-gray-300 border-l border-r border-t border-b text-gray-1000 hover:border-gray-1000 hover:bg-white disabled:text-gray-500 disabled:border-gray-500`,
  ghost: tw``,
};

const sizes = {
  small: tw`px-4 h-[2rem] text-info leading-4`,
  medium: tw`px-4 h-[2.5rem] text-b2 leading-4`,
  big: tw`px-4 h-[3rem] text-b2 leading-4`,
  bigger: tw`px-4 h-[3.5rem] text-b2 leading-4`,
  none: tw`text-b2 leading-4`,
};

const selectedStyles = {
  gray: tw`bg-gray-1000 text-white hover:bg-gray-800`,
  outlined: tw`bg-gray-200 border-gray-1000`,
  primary: tw``,
  secondary: tw``,
  ghost: tw``,
};

const disabledStyle = tw`text-gray-600`;

export interface ButtonProps {
  /** 버튼 안의 내용 */
  children?: string | ReactNode;
  /** 클릭 했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 테마 */
  variant?: 'primary' | 'outlined' | 'ghost' | 'secondary' | 'gray';
  /** 버튼 사이즈 */
  size?: 'small' | 'medium' | 'big' | 'bigger' | 'none';
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 선택되었는지 여부 */
  selected?: boolean;
}

const ButtonRoot = styled.button<ButtonProps>`
  ${defaultStyle}
  ${({ variant }) => variant && variants[variant]}
  ${({ size }) => size && sizes[size]}
  ${({ disabled }) => disabled && disabledStyle}
  ${({ isLoading }) => isLoading && tw`pointer-events-none`}
  ${({ selected, variant }) => selected && variant && selectedStyles[variant]}
`;

export default forwardRef<HTMLButtonElement, ButtonProps>((inProps, ref) => {
  const contextProps = useContext(ButtonGroupContext);
  const resolvedProps = resolveProps(inProps, contextProps);
  const {
    children,
    onClick,
    variant = 'primary',
    size = 'big',
    disabled = false,
    isLoading = false,
    selected = false,
    ...others
  } = resolvedProps;

  return (
    <ButtonRoot
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      isLoading={isLoading}
      selected={selected}
      {...others}
    >
      {isLoading && <Loading size="small" />}
      {!isLoading && children}
    </ButtonRoot>
  );
});
