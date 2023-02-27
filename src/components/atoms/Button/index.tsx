import React, { ReactNode } from 'react';
import tw, { TwStyle } from 'twin.macro';

type Props = {
  /** 버튼 안의 내용 */
  children: string | ReactNode;
  /** 클릭 했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 테마 */
  theme?: 'default' | 'outlined' | 'ghost';
  /** 버튼 사이즈 */
  size?: 'small' | 'big' | 'fit';
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 커스텀 스타일 */
  custom?: TwStyle;
};

const defaultStyle = tw`w-fit rounded-[0.5rem]`;

const themes = {
  default: tw`text-white bg-nego-800 disabled:bg-gray-200`,
  outlined: tw`bg-white border-gray-300 border-[1px] text-gray-1000`,
  ghost: tw``,
};

const sizes = {
  small: tw`px-2 h-8 text-b2`,
  big: tw`px-2 h-14 text-b1`,
  fit: tw`p-2 w-fit h-fit`,
};

const disabledStyle = tw`text-gray-600`;

export function Button({
  children,
  onClick,
  theme = 'default',
  size = 'fit',
  disabled = false,
  custom,
}: Props) {
  return (
    <button
      type="button"
      css={[
        defaultStyle,
        themes[theme],
        sizes[size],
        disabled && disabledStyle,
        custom,
      ]}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
}
