import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import RegisterSuccessAnimation from '@/../public/static/images/auth/register_success.gif';

const ImageContainer = styled.div`
  ${tw`relative [width: 380px] [height: 380px] mx-auto`}
`;

export default function SuccessAnimation() {
  return (
    <ImageContainer>
      <Image src={RegisterSuccessAnimation} alt="registerSuccess" fill />
    </ImageContainer>
  );
}
