import tw, { styled } from 'twin.macro';

interface Props {
  variant?: 'orange' | 'white';
}

const colors = {
  orange: tw`text-white bg-orange-700`,
  white: tw`text-gray-900 bg-white border border-gray-300`,
};

export default styled.h4<Props>(({ variant = 'orange' }) => [
  tw`h-5 px-1.5 text-info [font-size: 11px] inline-flex items-center rounded whitespace-nowrap`,
  colors[variant],
]);
