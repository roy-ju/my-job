import { useMemo } from 'react';

import tw from 'twin.macro';

import StepOne from '@/assets/icons/stepper_1.svg';

import StepTwo from '@/assets/icons/stepper_2.svg';

import StepThree from '@/assets/icons/stepper_3.svg';

import StepFour from '@/assets/icons/stepper_4.svg';

import StepFive from '@/assets/icons/stepper_5.svg';

import StepChecked from '@/assets/icons/stepper_check.svg';

import useGetStepperInfo from './hooks/useGetStepperInfo';

import getColor from '../utils/getColor';

import getStep from '../utils/getStep';

import StepperTitle from './ui/StepperTitle';

import StepperSeperator from './ui/StepperSeperator';

import AnimateStepperNumber from './ui/AnimateStepperNumber';

export default function Stepper() {
  const { title, currentIndex, subTitle, isIcon } = useGetStepperInfo();

  const hidden = useMemo(() => {
    if (currentIndex === 5 || currentIndex === 6) {
      return true;
    }

    return false;
  }, [currentIndex]);

  return (
    <div tw="p-5 pb-8">
      <div tw="flex items-center justify-center mb-6" css={[hidden && tw`hidden`]}>
        <AnimateStepperNumber active={getStep(0, currentIndex) === 'current'}>
          {getStep(0, currentIndex) === 'prev' ? (
            <StepChecked color={getColor(0, 1)} />
          ) : (
            <StepOne
              color={getColor(1, currentIndex)}
              css={[getStep(0, currentIndex) === 'current' && tw`[width: 24px] [height: 24px]`]}
            />
          )}
        </AnimateStepperNumber>

        <StepperSeperator step={getStep(0, currentIndex)} />

        <AnimateStepperNumber active={getStep(1, currentIndex) === 'current'}>
          {getStep(1, currentIndex) === 'prev' ? (
            <StepChecked color={getColor(0, 1)} />
          ) : (
            <StepTwo
              color={getColor(2, currentIndex)}
              css={[getStep(1, currentIndex) === 'current' && tw`[width: 24px] [height: 24px]`]}
            />
          )}
        </AnimateStepperNumber>

        <StepperSeperator step={getStep(1, currentIndex)} />

        <AnimateStepperNumber active={getStep(2, currentIndex) === 'current'}>
          {getStep(2, currentIndex) === 'prev' ? (
            <StepChecked color={getColor(0, 1)} />
          ) : (
            <StepThree
              color={getColor(3, currentIndex)}
              css={[getStep(2, currentIndex) === 'current' && tw`[width: 24px] [height: 24px]`]}
            />
          )}
        </AnimateStepperNumber>

        <StepperSeperator step={getStep(2, currentIndex)} />

        <AnimateStepperNumber active={getStep(3, currentIndex) === 'current'}>
          {getStep(3, currentIndex) === 'prev' ? (
            <StepChecked color={getColor(0, 1)} />
          ) : (
            <StepFour
              color={getColor(4, currentIndex)}
              css={[getStep(3, currentIndex) === 'current' && tw`[width: 24px] [height: 24px]`]}
            />
          )}
        </AnimateStepperNumber>

        <StepperSeperator step={getStep(3, currentIndex)} />

        <AnimateStepperNumber active={getStep(4, currentIndex) === 'current'}>
          {getStep(4, currentIndex) === 'prev' ? (
            <StepChecked color={getColor(0, 1)} />
          ) : (
            <StepFive
              color={getColor(5, currentIndex)}
              css={[getStep(4, currentIndex) === 'current' && tw`[width: 24px] [height: 24px]`]}
            />
          )}
        </AnimateStepperNumber>
      </div>
      <StepperTitle title={title} subTitle={subTitle} isIcon={isIcon} />
    </div>
  );
}
