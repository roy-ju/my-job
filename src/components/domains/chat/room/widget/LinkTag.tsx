import { HTMLProps, useContext } from 'react';

import tw, { styled } from 'twin.macro';

import ChatMessageContext from './ChatMessageContext';

const variants = {
  gray: tw`text-white bg-nego-100`,
  nego: tw`text-white bg-nego-100`,
  system: tw`px-0 py-0 text-center text-gray-700 bg-gray-200 text-body_01`,
};

const Container = styled.div<{ variant?: 'nego' | 'gray' | 'system' }>(({ variant = 'gray' }) => [
  tw`inline-block min-w-0 break-all whitespace-pre-wrap border border-gray-400 border-solid rounded-lg w-fit text-body_02`,
  variants[variant],
]);

export function LinkTag(props: Omit<HTMLProps<HTMLDivElement>, 'theme' | 'as'>) {
  const { variant } = useContext(ChatMessageContext);

  return <Container variant={variant} {...props} />;
}

export const LinkType = (<LinkTag />).type;
