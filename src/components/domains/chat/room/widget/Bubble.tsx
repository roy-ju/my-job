import { HTMLProps, useContext } from 'react';

import tw, { styled } from 'twin.macro';

import ChatMessageContext from './ChatMessageContext';

const variants = {
  gray: tw`bg-gray-200 text-gray-1000`,
  nego: tw`bg-nego-100 text-nego-1000`,
  system: tw`px-4 py-1.5 text-gray-700 bg-gray-200 text-body_01 text-center`,
};

const Container = styled.div<{ variant?: 'nego' | 'gray' | 'system' }>(({ variant = 'gray' }) => [
  tw`inline-block min-w-0 px-4 py-2 break-all whitespace-pre-wrap rounded-lg text-body_02 w-fit`,
  variants[variant],
]);

export function Bubble(props: Omit<HTMLProps<HTMLDivElement>, 'theme' | 'as'>) {
  const { variant } = useContext(ChatMessageContext);

  return <Container variant={variant} {...props} />;
}

export const BubbleType = (<Bubble />).type;
