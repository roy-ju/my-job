import { memo } from 'react';

import { motion } from 'framer-motion';

import { AnimationP } from '../ui/AnimationText';

import CheckBoxButton from '../ui/CheckBoxButton';

import getIncludeValue from '../../utils/getIncludeValue';

import interviews from '../constants/interviews';

import HELPER_MESSAGE from '../constants/helperMessage';

import FIELD_ID from '../constants/fieldId';

type InterviewFieldProps = {
  selectedList: string[];
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
  isUpdateForm?: boolean;
};

function InterviewField({ isUpdateForm = false, selectedList, handleClick }: InterviewFieldProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <div id={FIELD_ID.Interview} tw="flex flex-col gap-5">
        {isUpdateForm
          ? interviews.map((item) => (
              <CheckBoxButton
                key={item}
                value={item}
                label={item}
                selected={getIncludeValue(item, selectedList)}
                handleClick={handleClick}
              />
            ))
          : interviews
              .slice(0, interviews.length - 2)
              .map((item) => (
                <CheckBoxButton
                  key={item}
                  value={item}
                  label={item}
                  selected={getIncludeValue(item, selectedList)}
                  handleClick={handleClick}
                />
              ))}
      </div>

      {isUpdateForm && (
        <AnimationP tw="pl-7 text-body_01 text-nego-800 mt-0.5" transition={{ duration: 0.6 }}>
          {HELPER_MESSAGE.INTERVIEW}
        </AnimationP>
      )}
    </motion.div>
  );
}

export default memo(InterviewField);
