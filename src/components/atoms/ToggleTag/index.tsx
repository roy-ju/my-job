import tw, { styled } from 'twin.macro';

interface ToggleTagProps {
  selected?: boolean;
}

const defaultStyle = tw`flex items-center justify-center transition-all text-body_02 text-gray-700 [padding: 9px 16px] border border-gray-400 h-10 hover:border-nego-800 bg-white [border-radius: 100px]`;

const ToggleTag = styled.button<ToggleTagProps>`
  ${defaultStyle}
  ${({ selected }) => selected && tw`border-nego-600 text-nego-800 font-bold hover:border-nego-600 hover:bg-nego-100`}
`;

export default ToggleTag;
