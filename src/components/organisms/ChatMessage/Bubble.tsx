import { HTMLProps, useContext } from 'react';
import tw, { styled } from 'twin.macro';
import ChatMessageContext from './ChatMessageContext';

const colorVariants = {
  gray: tw`bg-gray-200 text-gray-1000`,
  nego: tw`bg-nego-100 text-nego-1000`,
};

const Container = styled.div<{ variant?: 'nego' | 'gray' }>(({ variant = 'gray' }) => [
  tw`inline-block min-w-0 px-4 py-2 rounded-lg text-b2 w-fit`,
  colorVariants[variant],
]);

export function Bubble(props: Omit<HTMLProps<HTMLDivElement>, 'theme' | 'as'>) {
  const { variant } = useContext(ChatMessageContext);

  return <Container variant={variant} {...props} />;
}

export const BubbleType = (<Bubble />).type;
