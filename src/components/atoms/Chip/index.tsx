import tw, { styled } from 'twin.macro';

interface Props {
  variant?: 'nego' | 'red' | 'gray' | 'green' | 'outlined';
}

const colors = {
  nego: tw`bg-nego-100 text-nego-1000`,
  red: tw`bg-red-100 text-red-1000`,
  gray: tw`text-gray-700 bg-gray-300`,
  green: tw`bg-green-100 text-green-1000`,
  outlined: tw`text-gray-900 bg-white border border-gray-300`,
};

export default styled.span<Props>(({ variant = 'nego' }) => [
  tw`h-5 px-1.5 text-info leading-3.5 inline-flex items-center rounded whitespace-nowrap`,
  colors[variant],
]);
