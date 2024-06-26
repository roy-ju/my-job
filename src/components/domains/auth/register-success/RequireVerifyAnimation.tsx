import tw, { styled } from 'twin.macro';

import Lottie from 'react-lottie';

import animationData from '@/assets/icons/json/surprised.json';

const ImageContainer = styled.div`
  ${tw`relative flex items-center justify-center pt-20`}
`;

export default function RequireVerifyAnimation() {
  return (
    <ImageContainer>
      <Lottie
        options={{
          loop: true,
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
