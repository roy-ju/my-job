import { memo } from 'react';

import { AnimationP } from '../ui/AnimationText';

import CheckBoxButton from '../ui/CheckBoxButton';

import getIncludeValue from '../../utils/getIncludeValue';

import interviews from '../constants/interviews';

type InterviewFieldProps = {
  selectedList: string[];
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

function InterviewField({ selectedList, handleClick }: InterviewFieldProps) {
  return (
    <>
      <div tw="flex flex-col gap-5">
        {interviews.map((item) => (
          <CheckBoxButton
            key={item}
            value={item}
            label={item}
            selected={getIncludeValue(item, selectedList)}
            handleClick={handleClick}
          />
        ))}
      </div>
      <AnimationP tw="pl-7 text-body_01 text-nego-800 mt-0.5" transition={{ duration: 0.6 }}>
        인터뷰를 진행하면 원하는 매물을 추천 받을 확률이 높아져요!
      </AnimationP>
    </>
  );
}

export default memo(InterviewField);
