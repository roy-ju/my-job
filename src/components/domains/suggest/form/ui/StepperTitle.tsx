import { memo } from 'react';

import { v1 } from 'uuid';
import { AnimationP } from './AnimationText';

type StepperTitleProps = { title: string; subTitle: string };

function StepperTitle({ title, subTitle }: StepperTitleProps) {
  return (
    <>
      <AnimationP key={v1()} tw="text-heading_01 text-gray-900 text-center">
        {title}
      </AnimationP>
      <AnimationP
        key={v1()}
        transition={{ duration: 0.4 }}
        tw="text-body_02 text-gray-700 text-center mt-1 whitespace-pre-line"
      >
        {subTitle}
      </AnimationP>
    </>
  );
}

export default memo(StepperTitle);
