import { memo } from 'react';

import { motion } from 'framer-motion';

import SelectButton from '../ui/SelectButton';

import CheckBoxButton from '../ui/CheckBoxButton';

import FIELD_ID from '../constants/fieldId';

import getIncludeValue from '../../utils/getIncludeValue';

import makeHash from '../../utils/makeHash';

type AdditionalConditionsFieldProps = {
  list: string[];
  selectedList: string[];
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

function AdditionalConditionsField({ list, selectedList, handleClick }: AdditionalConditionsFieldProps) {
  return (
    <>
      <div id={FIELD_ID.AdditionalCondtions} tw="flex flex-row flex-wrap gap-3">
        {list
          .filter((item) => item !== '원하는 조건이 없어요!')
          .map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
            >
              <SelectButton
                key={item}
                variant={getIncludeValue(item, selectedList) ? 'primaryOutline' : 'grayOutline'}
                value={item}
                selected={getIncludeValue(item, selectedList)}
                onClick={handleClick}
              >
                {makeHash(item, '원하는 조건이 없어요!')}
              </SelectButton>
            </motion.div>
          ))}
      </div>
      {list.find((item) => item === '원하는 조건이 없어요!') && (
        <div tw="mt-6">
          <CheckBoxButton
            label="원하는 조건이 없어요!"
            value="원하는 조건이 없어요!"
            selected={getIncludeValue('원하는 조건이 없어요!', selectedList)}
            handleClick={handleClick}
          />
        </div>
      )}
    </>
  );
}

export default memo(AdditionalConditionsField);
