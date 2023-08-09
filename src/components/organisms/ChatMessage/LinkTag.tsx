import { HTMLProps, useContext } from 'react';
import tw, { styled } from 'twin.macro';
import ChatMessageContext from './ChatMessageContext';

const variants = {
  gray: tw`text-white bg-gray-400`,
  nego: tw`text-white bg-gray-400`,
  system: tw`px-0 py-0 text-center text-gray-700 bg-gray-200 text-info`,
};

const Container = styled.div<{ variant?: 'nego' | 'gray' | 'system' }>(({ variant = 'gray' }) => [
  tw`inline-block w-full min-w-0 px-2 py-2 break-all whitespace-pre-wrap rounded-lg text-b2`,
  variants[variant],
]);

export function LinkTag(props: Omit<HTMLProps<HTMLDivElement>, 'theme' | 'as'>) {
  const { variant } = useContext(ChatMessageContext);

  return <Container variant={variant} {...props} />;
}

export const LinkType = (<LinkTag />).type;
