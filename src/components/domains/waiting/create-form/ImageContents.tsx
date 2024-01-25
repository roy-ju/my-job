import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import WritingAnimation from '@/../public/static/images/writing.gif';

const ImageContainer = styled.div`
  ${tw`w-full [height: 240px] pt-2.5 [padding-bottom: 30px]`}
`;

export default function ImageContents() {
  return (
    <ImageContainer>
      <Image src={WritingAnimation} alt="writing" width={200} height={200} tw="mx-auto" />
    </ImageContainer>
  );
}
