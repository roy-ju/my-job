import { HTMLProps, useContext } from 'react';
import tw, { styled } from 'twin.macro';
import ChatMessageContext from './ChatMessageContext';

const variants = {
  gray: tw`bg-gray-200 text-gray-1000`,
  nego: tw`bg-nego-100 text-nego-1000`,
  system: tw`px-0 py-0 text-center text-gray-700 bg-gray-200 text-info`,
};

const Container = styled.div<{ variant?: 'nego' | 'gray' | 'system' }>(({ variant = 'gray' }) => [
  tw`inline-block min-w-0 px-0 py-0 break-all whitespace-pre-wrap rounded-lg text-b2 w-fit`,
  variants[variant],
]);

export function Photo(props: Omit<HTMLProps<HTMLDivElement>, 'theme' | 'as'>) {
  const { variant } = useContext(ChatMessageContext);

  return <Container variant={variant} {...props} />;
}

export const PhotoType = (<Photo />).type;
