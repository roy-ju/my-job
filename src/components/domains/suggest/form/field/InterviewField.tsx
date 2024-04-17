import { memo } from 'react';

import { motion } from 'framer-motion';

import CheckBoxButton from '../ui/CheckBoxButton';

import getIncludeValue from '../../utils/getIncludeValue';

import interviews from '../constants/interviews';

import FIELD_ID from '../constants/fieldId';

type InterviewFieldProps = {
  selectedList: string[];
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

function InterviewField({ selectedList, handleClick }: InterviewFieldProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <div id={FIELD_ID.Interview} tw="flex flex-col gap-5">
        {interviews.slice(0, interviews.length - 1).map((item) => (
          <CheckBoxButton
            key={item}
            value={item}
            label={item}
            selected={getIncludeValue(item, selectedList)}
            handleClick={handleClick}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default memo(InterviewField);
