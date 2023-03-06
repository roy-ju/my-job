import React, { ReactNode, useContext } from 'react';
import tw, { TwStyle } from 'twin.macro';
import LoadingDot from '@/assets/icons/loading_dot.svg';
import ButtonGroupContext from '@/components/molecules/ButtonGroup/ButtonGroupContext';
import { resolveProps } from '@/utils';

export interface ButtonProps {
  /** 버튼 안의 내용 */
  children?: string | ReactNode;
  /** 클릭 했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 테마 */
  theme?: 'primary' | 'outlined' | 'ghost' | 'secondary' | 'gray';
  /** 버튼 사이즈 */
  size?: 'default' | 'small' | 'big' | 'medium' | 'none';
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 커스텀 스타일 */
  custom?: TwStyle;
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 선택되었는지 여부 */
  isSelected?: boolean;
}

const defaultStyle = tw`flex items-center justify-center h-fit rounded-[0.5rem]`;

const themes = {
  primary: tw`text-white bg-gray-1000 hover:bg-gray-800 disabled:bg-gray-400 disabled:text-white`,
  secondary: tw`text-white bg-nego-800 hover:bg-nego-600 disabled:bg-nego-300 disabled:text-white`,
  gray: tw`text-gray-1000 bg-gray-200 hover:bg-gray-400 disabled:bg-gray-200`,
  outlined: tw`bg-white border-gray-300 border-l border-r border-t border-b text-gray-1000 hover:border-gray-1000 hover:bg-white disabled:text-gray-500 disabled:border-gray-500`,
  ghost: tw``,
};

const sizes = {
  default: tw`px-4 h-[3.5rem]`,
  small: tw`px-4 h-[2rem] text-info`,
  medium: tw`px-4 h-[2.5rem]`,
  big: tw`px-4 h-[3rem]`,
  none: tw``,
};

const disabledStyle = tw`text-gray-600`;

function getSelectedStyle(t: string) {
  switch (t) {
    case 'gray':
      return tw`bg-gray-1000 text-white`;
    case 'outlined':
      return tw`bg-gray-200 border-gray-1000`;
    default:
      return tw``;
  }
}

function Button(inProps: ButtonProps) {
  const contextProps = useContext(ButtonGroupContext);
  const resolvedProps = resolveProps(inProps, contextProps);
  const {
    children,
    onClick,
    theme = 'primary',
    size = 'default',
    disabled = false,
    custom,
    isLoading = false,
    isSelected = false,
    buttonStyle, // custom button style from ButtonGroup
  } = resolvedProps;

  return (
    <button
      type="button"
      css={[
        defaultStyle,
        themes[theme],
        sizes[size],
        disabled && disabledStyle,
        isLoading && tw`pointer-events-none`,
        isSelected && getSelectedStyle(theme),
        custom,
        buttonStyle,
      ]}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && (
        <div tw="flex gap-2">
          <div>
            <LoadingDot />
          </div>
          <div tw="opacity-50">
            <LoadingDot />
          </div>
          <div tw="opacity-20">
            <LoadingDot />
          </div>
        </div>
      )}
      {!isLoading && children}
    </button>
  );
}

export default Button;
