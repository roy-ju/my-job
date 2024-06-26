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
  up: tw`flex items-center justify-center gap-0.5`,
};

const sizes = {
  small: tw`text-gray-600 text-body_01`,
  large: tw`text-gray-700 text-body_02`,
};

const colors = {
  gray600: tw`text-gray-600`,
  gray700: tw`text-gray-700`,
  nego800: tw`text-nego-800`,
  gray1000: tw`text-gray-1000`,
};

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'underline' | 'right' | 'down' | 'up';
  size: 'small' | 'large';
  color: 'gray600' | 'gray700' | 'nego800' | 'gray1000';
  title: string;
}

const TextButtonUI = styled.button<Omit<TextButtonProps, 'title'>>`
  ${({ variant }) => variant && variants[variant]}
  ${({ size }) => size && sizes[size]}
  ${({ color }) => color && colors[color]}
`;

export default function TextButton({ variant, size, title, ...others }: TextButtonProps) {
  return (
    <TextButtonUI variant={variant} size={size} {...others}>
      {title}
      {variant === 'right' && size === 'small' && <ArrowRightSmallIcon />}
      {variant === 'right' && size === 'large' && <ArrowRightLargeIcon />}

      {variant === 'down' && size === 'small' && <ArrowDownSmallIcon />}
      {variant === 'down' && size === 'large' && <ArrowDownLargeIcon />}

      {variant === 'up' && size === 'small' && <ArrowDownSmallIcon tw="rotate-180" />}
      {variant === 'up' && size === 'large' && <ArrowDownLargeIcon tw="rotate-180" />}
    </TextButtonUI>
  );
}
