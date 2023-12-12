import tw, { styled } from 'twin.macro';

interface Props {
  variant?:
    | 'nego'
    | 'red'
    | 'gray'
    | 'green'
    | 'blue'
    | 'orange'
    | 'yellow'
    | 'outlined'
    | 'black'
    | 'lightBlue'
    | 'yellowOrange';
}

const colors = {
  nego: tw`bg-nego-100 text-nego-1000`,
  red: tw`bg-red-100 text-red-1000`,
  gray: tw`text-gray-800 bg-gray-200`,
  green: tw`bg-green-100 text-green-1000`,
  blue: tw`bg-blue-100 text-blue-1000`,
  orange: tw`bg-orange-100 text-orange-1000`,
  yellow: tw`bg-yellow-100 text-yellow-1000`,
  yellowOrange: tw`bg-yellow-100 text-orange-1000`,
  black: tw`text-white bg-gray-1000`,
  lightBlue: tw`text-white bg-blue-600`,
  outlined: tw`text-gray-900 bg-white border border-gray-300`,
};

export default styled.h4<Props>(({ variant = 'nego' }) => [
  tw`h-5 px-1.5 text-caption_01 inline-flex items-center rounded whitespace-nowrap`,
  colors[variant],
]);
