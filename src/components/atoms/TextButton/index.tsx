import { ButtonHTMLAttributes } from 'react';

import tw, { styled } from 'twin.macro';

import ArrowDownSmallIcon from '@/assets/icons/arrow_down_12_1.svg';

import ArrowDownLargeIcon from '@/assets/icons/arrow_down_16_1.svg';

import ArrowRightSmallIcon from '@/assets/icons/arrow_right_12_1.svg';

import ArrowRightLargeIcon from '@/assets/icons/arrow_right_16_1.svg';

const variants = {
  underline: tw`flex items-center justify-center underline`,
  right: tw`flex items-center justify-center gap-0.5`,
  down: tw`flex items-center justify-center gap-0.5`,
};

const sizes = {
  small: tw`text-gray-600 text-body_01`,
  large: tw`text-gray-700 text-body_02`,
};

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'underline' | 'right' | 'down';
  size: 'small' | 'large';

  title: string;
}

const TextButtonUI = styled.button<Omit<TextButtonProps, 'title'>>`
  ${({ variant }) => variant && variants[variant]}
  ${({ size }) => size && sizes[size]}
`;

export default function TextButton({ variant, size, title, ...others }: TextButtonProps) {
  return (
    <TextButtonUI variant={variant} size={size} {...others}>
      {title}
      {variant === 'right' && size === 'small' && <ArrowRightSmallIcon />}
      {variant === 'right' && size === 'large' && <ArrowRightLargeIcon />}
      {variant === 'down' && size === 'small' && <ArrowDownSmallIcon />}
      {variant === 'down' && size === 'large' && <ArrowDownLargeIcon />}
    </TextButtonUI>
  );
}
