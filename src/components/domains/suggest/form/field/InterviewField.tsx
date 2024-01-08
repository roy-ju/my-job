import { memo } from 'react';

import { AnimationP } from '../ui/AnimationText';

import CheckBoxButton from '../ui/CheckBoxButton';

import getIncludeValue from '../../utils/getIncludeValue';

import interviews from '../constants/interviews';

import HELPER_MESSAGE from '../constants/helperMessage';

import FIELD_ID from '../constants/fieldId';

type InterviewFieldProps = {
  selectedList: string[];
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

function InterviewField({ selectedList, handleClick }: InterviewFieldProps) {
  return (
    <>
      <div id={FIELD_ID.Interview} tw="flex flex-col gap-5">
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
        {HELPER_MESSAGE.INTERVIEW}
      </AnimationP>
    </>
  );
}

export default memo(InterviewField);
