import { forwardRef, ReactNode } from 'react';

import tw, { styled } from 'twin.macro';

export interface CheckBoxButtonProps {
  children?: string | ReactNode;

  variant?: 'primary';
  radius?: 'none' | 'r8';
  selected?: boolean;
  active?: boolean;

  id?: string;
  name?: string;
  value?: string | number;
  disabled?: boolean;
  isLoading?: boolean;
  style?: React.CSSProperties;

  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const defaultStyle = tw`flex items-center justify-center transition-all w-full h-12 text-body_02`;

const variants = {
  primary: tw`text-gray-800 hover:text-nego-500`,
};

const selectedStyles = {
  primary: tw`bg-nego-100 text-nego-800 hover:text-nego-800 `,
};

const activeStyles = {
  primary: tw`bg-white text-nego-800 hover:text-nego-800`,
};

const radiuses = {
  none: tw``,
  r8: tw`rounded-lg`,
};

const ButtonRoot = styled.button<CheckBoxButtonProps>`
  ${defaultStyle}
  ${({ variant }) => variant && variants[variant]}
  ${({ radius }) => radius && radiuses[radius]}
  ${({ active, variant }) => active && variant && activeStyles[variant]}
  ${({ selected, variant }) => selected && variant && selectedStyles[variant]}
`;

export default forwardRef<HTMLButtonElement, CheckBoxButtonProps>((inProps, ref) => {
  const {
    onClick,
    onMouseDown,
    variant = 'primary',
    radius = 'none',
    selected = false,
    active = false,
    disabled = false,
    value,
    name,
    id,
    style,
    children,
    ...others
  } = inProps;

  return (
    <ButtonRoot
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      variant={variant}
      selected={selected}
      active={active}
      radius={radius}
      name={name}
      value={value}
      id={id}
      style={style}
      {...others}
    >
      {children}
    </ButtonRoot>
  );
});
