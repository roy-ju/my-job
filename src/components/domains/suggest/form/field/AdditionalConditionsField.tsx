import { memo } from 'react';

import { motion } from 'framer-motion';

import SelectTag from '@/components/atoms/SelectTag';

import { AnimationP } from '../ui/AnimationText';

import useIcons from '../hooks/useIcons';

import FIELD_ID from '../constants/fieldId';

import getIncludeValue from '../../utils/getIncludeValue';

import { HashTagTitleObj } from '../constants/hashtags';

type AdditionalConditionsFieldProps = {
  list: { [key: string]: string[] }[];
  selectedList: string[];
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

function AdditionalConditionsField({ list, selectedList, handleClick }: AdditionalConditionsFieldProps) {
  const { iconObj } = useIcons();

  return (
    <>
      <div id={FIELD_ID.AdditionalConditions} tw="flex flex-col gap-10">
        {list.map((tags) => {
          const key = Object.keys(tags)[0];
          const items = tags[key];

          return (
            <div key={key} tw="flex flex-col gap-3">
              {HashTagTitleObj[key] && (
                <AnimationP tw="text-subhead_02 text-gray-900">{HashTagTitleObj[key]}</AnimationP>
              )}
              <div tw="flex flex-row flex-wrap gap-3">
                {items.map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <SelectTag
                      key={item}
                      value={item}
                      selected={getIncludeValue(item, selectedList)}
                      onClick={handleClick}
                    >
                      {iconObj[item]}
                      {item}
                    </SelectTag>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default memo(AdditionalConditionsField);
