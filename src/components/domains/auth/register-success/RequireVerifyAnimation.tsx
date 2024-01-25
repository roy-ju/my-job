import tw, { styled } from 'twin.macro';

import Lottie from 'react-lottie';

import animationData from '@/assets/icons/json/surprised.json';

const ImageContainer = styled.div`
  ${tw`relative flex items-center justify-center [min-height: 386px]`}
`;

export default function RequireVerifyAnimation() {
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
