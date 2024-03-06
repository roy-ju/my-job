import tw, { styled } from 'twin.macro';

const defaultStyle = tw`relative [border-radius: 100px] [padding-top: 5px] [padding-bottom: 5px] px-4 cursor-pointer whitespace-nowrap text-body_02 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:bg-gray-300 active:bg-gray-400`;

const BoxTab = styled.button<{ selected: boolean }>`
  ${defaultStyle}
  ${({ selected }) => selected && tw`text-white bg-gray-900 hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900`}
`;

export default BoxTab;
