import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import RegisterSuccessAnimation from '@/../public/static/images/auth/register_success.gif';

const ImageContainer = styled.div`
  ${tw`relative [width: 100%] [min-height: 380px]`}
`;

export default function SuccessAnimation() {
  return (
    <ImageContainer>
      <Image src={RegisterSuccessAnimation} alt="registerSuccess" fill />
    </ImageContainer>
  );
}
