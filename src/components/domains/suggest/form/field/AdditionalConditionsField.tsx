import { memo } from 'react';

import { motion } from 'framer-motion';

import SelectButton from '../ui/SelectButton';

import CheckBoxButton from '../ui/CheckBoxButton';

import { AnimationP } from '../ui/AnimationText';

import useIcons from '../hooks/useIcons';

import FIELD_ID from '../constants/fieldId';

import getIncludeValue from '../../utils/getIncludeValue';

import { HastgTitleObj } from '../constants/hashtags';

type AdditionalConditionsFieldProps = {
  list: { [key: string]: string[] }[];
  selectedList: string[];
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

function AdditionalConditionsField({ list, selectedList, handleClick }: AdditionalConditionsFieldProps) {
  const { iconObj } = useIcons();

  return (
    <>
      <div id={FIELD_ID.AdditionalCondtions} tw="flex flex-col gap-10">
        {list.map((tags) => {
          const key = Object.keys(tags)[0];
          const items = tags[key];

          return (
            <div key={key} tw="flex flex-col gap-3">
              {HastgTitleObj[key] && <AnimationP tw="text-subhead_02 text-gray-900">{HastgTitleObj[key]}</AnimationP>}
              <div tw="flex flex-row flex-wrap gap-3">
                {items.map((item) => (
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
                      tw="flex items-center gap-1"
                    >
                      {iconObj[item]}
                      {item}
                    </SelectButton>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
        <div tw="pb-10">
          <CheckBoxButton
            label="원하는 조건이 없어요!"
            value="원하는 조건이 없어요!"
            selected={getIncludeValue('원하는 조건이 없어요!', selectedList)}
            handleClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}

export default memo(AdditionalConditionsField);
