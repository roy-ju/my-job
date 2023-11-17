import tw, { styled } from 'twin.macro';

interface Props {
  variant?: 'orange';
}

const colors = {
  orange: tw`text-white bg-orange-700`,
};

export default styled.h4<Props>(({ variant = 'orange' }) => [
  tw`h-5 px-1.5 text-info leading-3.5 inline-flex items-center rounded whitespace-nowrap`,
  colors[variant],
]);
