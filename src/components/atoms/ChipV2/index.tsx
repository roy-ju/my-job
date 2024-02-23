import tw, { styled } from 'twin.macro';

interface Props {
  variant?: 'primary' | 'red' | 'gray' | 'green' | 'blue' | 'yellow';

  size?: 'small' | 'large';
}

const sizes = {
  small: tw`h-5 text-caption_01`,

  large: tw`h-6 text-subhead_02`,
};

const colors = {
  primary: tw`bg-nego-100 text-nego-800`,

  red: tw`text-red-800 bg-red-100`,

  gray: tw`text-gray-800 bg-gray-200`,

  green: tw`text-green-800 bg-green-100`,

  blue: tw`text-blue-800 bg-blue-100`,

  yellow: tw`text-yellow-800 bg-yellow-100`,
};

export default styled.h4<Props>(({ variant = 'primary', size = 'small' }) => [
  tw`py-0.5 px-2 inline-flex items-center rounded whitespace-nowrap [border-radius: 100px]`,
  colors[variant],
  sizes[size],
]);
