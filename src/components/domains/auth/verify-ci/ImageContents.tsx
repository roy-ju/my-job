import tw, { styled } from 'twin.macro';

import Lottie from 'react-lottie';

import animationData from '@/assets/icons/json/personal_authentication.json';

const ImageContainer = styled.div`
  ${tw`relative w-full [height: 422px] pt-20`}
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
        height={200}
        width={200}
      />
    </ImageContainer>
  );
}
