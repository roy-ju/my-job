import tw, { styled } from 'twin.macro';

interface Props {
  variant?: 'nego' | 'red';
}

const colors = {
  nego: tw`bg-nego-100 text-nego-1000`,
  red: tw`bg-red-100 text-red-1000`,
};

export default styled.span<Props>(({ variant = 'nego' }) => [
  tw`h-5 px-1.5 text-info leading-3.5 inline-flex items-center rounded`,
  colors[variant],
]);
