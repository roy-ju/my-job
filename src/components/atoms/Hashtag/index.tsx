import tw, { styled } from 'twin.macro';

interface HashtagProps {
  size: 'small' | 'medium' | 'large';
}

const sizes = {
  small: tw`text-body_01 [padding-block: 6px]`,
  medium: tw`text-body_02 [padding-block: 5px]`,
  large: tw`text-body_03 [padding-block: 4px]`,
};

const defaultStyle = tw`flex flex-row items-center gap-0.5 justify-center bg-gray-100 [border-radius: 100px] text-gray-700 px-3`;

const Hashtag = styled.button<HashtagProps>`
  ${defaultStyle}
  ${({ size }) => size && sizes[size]}
`;

export default Hashtag;
