import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import tw from 'twin.macro';

import StepOne from '@/assets/icons/stepper_1.svg';

import StepTwo from '@/assets/icons/stepper_2.svg';

import StepThree from '@/assets/icons/stepper_3.svg';

import StepFour from '@/assets/icons/stepper_4.svg';

import StepFive from '@/assets/icons/stepper_5.svg';

import useGetStepperInfo from './hooks/useGetStepperInfo';

import getColor from '../utils/getColor';

import getStep from '../utils/getStep';

import StepperTitle from './ui/StepperTitle';

const AnimateStepperNumber = dynamic(() => import('./ui/AnimateStepperNumber'), { ssr: false });

const StepperSeperator = dynamic(() => import('./ui/StepperSeperator'), { ssr: false });

export default function Stepper() {
  const { title, currentIndex, subTitle } = useGetStepperInfo();

  const hidden = useMemo(() => {
    if (currentIndex === 5 || currentIndex === 6) {
      return true;
    }

    return false;
  }, [currentIndex]);

  return (
    <div tw="p-5 pb-8 shadow-sm">
      <div tw="flex items-center justify-center mb-6" css={[hidden && tw`hidden`]}>
        <AnimateStepperNumber active={getStep(1, currentIndex) === 'current'}>
          <StepOne color={getColor(1, currentIndex)} />
        </AnimateStepperNumber>
        <StepperSeperator step={getStep(2, currentIndex)} />
        <AnimateStepperNumber active={getStep(2, currentIndex) === 'current'}>
          <StepTwo color={getColor(2, currentIndex)} />
        </AnimateStepperNumber>
        <StepperSeperator step={getStep(3, currentIndex)} />
        <AnimateStepperNumber active={getStep(3, currentIndex) === 'current'}>
          <StepThree color={getColor(3, currentIndex)} />
        </AnimateStepperNumber>
        <StepperSeperator step={getStep(4, currentIndex)} />
        <AnimateStepperNumber active={getStep(4, currentIndex) === 'current'}>
          <StepFour color={getColor(4, currentIndex)} />
        </AnimateStepperNumber>
        <StepperSeperator step={getStep(5, currentIndex)} />
        <AnimateStepperNumber active={getStep(5, currentIndex) === 'current'}>
          <StepFive color={getColor(5, currentIndex)} />
        </AnimateStepperNumber>
      </div>
      <StepperTitle title={title} subTitle={subTitle} />
    </div>
  );
}
