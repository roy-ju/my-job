import { ReactNode, isValidElement } from 'react';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import { v1 } from 'uuid';

import BuyPurpose from '@/../public/static/images/direct_hit.png';

import WantedHome from '@/../public/static/images/house_with_garden.png';

import AdditionalConditions from '@/../public/static/images/light_bulb.png';

import Location from '@/../public/static/images/round_pushpin.png';

import Interview from '@/../public/static/images/phone.png';

import Area from '@/../public/static/images/triangular_ruler.png';

import { motion } from 'framer-motion';
import ImageContainer from './SummaryImageContainer';

import { AnimationP } from './AnimationText';

type SummaryContainerProps = {
  isRender?: boolean;
  title: string;
  children: ReactNode;
  duration?: number;
};

const Container = styled(motion.div)`
  ${tw`flex flex-col gap-1 pb-2 bg-gray-100 px-4 py-3 rounded-lg`}
`;

function SummaryContainer({ isRender = true, title, children, duration = 0.5 }: SummaryContainerProps) {
  const isComponent = isValidElement(children);

  const obj: Record<string, ReactNode> = {
    위치: <Image src={Location} width={20} height={20} alt="location" />,
    '원하는 집': <Image src={WantedHome} width={20} height={20} alt="wantedHome" />,
    '거래 목적': <Image src={BuyPurpose} width={20} height={20} alt="buyPurpose" />,
    평수: <Image src={Area} width={20} height={20} alt="area" />,
    인터뷰: <Image src={Interview} width={20} height={20} alt="interview" />,
    '추가 조건': <Image src={AdditionalConditions} width={20} height={20} alt="additionalConditions" />,
  };

  if (!isRender) return null;

  return (
    <Container initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <div tw="flex items-center gap-2">
        <ImageContainer key={v1()} transition={{ duration: 0.5 }}>
          {obj[title]}
        </ImageContainer>
        <AnimationP
          key={v1()}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          tw="text-gray-1000 text-subhead_03 [width: 84px]"
        >
          {title}
        </AnimationP>
      </div>
      {isComponent ? (
        children
      ) : (
        <AnimationP
          key={v1()}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration }}
          tw="text-body_02 text-gray-800"
        >
          {children}
        </AnimationP>
      )}
    </Container>
  );
}

export default SummaryContainer;
