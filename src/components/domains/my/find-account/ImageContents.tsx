import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import LockAnimation from '@/../public/static/images/auth/lock.gif';

const ImageContainer = styled.div`
  ${tw`w-full`}
`;

export default function ImageContents() {
  return (
    <ImageContainer>
      <Image src={LockAnimation} alt="lock" width={250} height={250} tw="mx-auto" />
    </ImageContainer>
  );
}
