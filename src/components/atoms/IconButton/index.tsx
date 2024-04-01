import { forwardRef } from 'react';

import tw, { styled, theme } from 'twin.macro';

import ArrowRight from '@/assets/icons/icon_arrow_24_2.svg';

export interface IconButtonProps {
  variant?: 'primary' | 'ghost';
  id?: string;
  name?: string;
  value?: string | number;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const defaultStyle = tw`flex items-center justify-center transition-all w-12 h-12`;

const variants = {
  primary: tw`border-none bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200 active:bg-gray-500 [border-radius: 100px]`,

  ghost: tw``,
};

const ButtonRoot = styled.button<IconButtonProps>`
  ${defaultStyle}
  ${({ variant }) => variant && variants[variant]}
`;

export default forwardRef<HTMLButtonElement, IconButtonProps>((inProps, ref) => {
  const { onClick, onMouseDown, variant = 'primary', disabled = false, value, name, id, style, ...others } = inProps;

  return (
    <ButtonRoot
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      variant={variant}
      name={name}
      value={value}
      id={id}
      style={style}
      {...others}
    >
      <ArrowRight color={theme`colors.gray.700`} />
    </ButtonRoot>
  );
});
