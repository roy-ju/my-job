import tw, { styled } from 'twin.macro';

interface SelectTagProps {
  selected?: boolean;
  isRightIcon?: boolean;
}

const defaultStyle = tw`flex items-center justify-center gap-1 transition-all text-body_02 text-gray-700 [padding: 5px 16px] border border-gray-400 h-8 hover:border-nego-600 hover:text-nego-800 bg-white [border-radius: 100px]`;

const SelectTag = styled.button<SelectTagProps>`
  ${defaultStyle}
  ${({ selected }) => selected && tw`border-nego-800 text-nego-800 bg-nego-100`}
  ${({ isRightIcon }) => isRightIcon && tw`pr-1.5`}
`;

export default SelectTag;
