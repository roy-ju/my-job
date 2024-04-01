import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import ServiceErrorImg from '@/../public/static/images/service_error.png';

const ServiceErrorWrraper = styled.div`
  ${tw`mx-auto mt-20`}
`;

export default function ServiceError() {
  return (
    <ServiceErrorWrraper>
      <Image src={ServiceErrorImg.src} width={200} height={200} alt="service_error" />
    </ServiceErrorWrraper>
  );
}
