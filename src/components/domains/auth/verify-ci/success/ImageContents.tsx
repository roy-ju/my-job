import tw, { styled } from 'twin.macro';

import Lottie from 'react-lottie';

import animationData from '@/assets/icons/json/check.json';

const ImageContainer = styled.div`
  ${tw`relative w-full [height: 397px]`}
`;

export default function ImageContents() {
  return (
    <ImageContainer>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={375}
        width={375}
      />
    </ImageContainer>
  );
}
