import { memo } from 'react';

import { motion } from 'framer-motion';

import SelectTag from '@/components/atoms/SelectTag';

import DeleteIcon from '@/assets/icons/delete_nego.svg';

import getIncludeValue from '../../utils/getIncludeValue';

import CheckBoxButton from '../ui/CheckBoxButton';

import FIELD_ID from '../constants/fieldId';

type PyoungListFieldProps = {
  isRender: boolean;
  list: string[];
  selectedList: string[];
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
  handleClickDelete?: (e?: NegocioMouseEvent<HTMLButtonElement> | undefined) => void;
};

function PyoungListField({ isRender, list, selectedList, handleClick, handleClickDelete }: PyoungListFieldProps) {
  if (!isRender) return null;

  return (
    <>
      <div id={FIELD_ID.PyoungList} tw="flex flex-row flex-wrap gap-3">
        {list
          .filter((item) => item !== '잘 모르겠어요')
          .map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
            >
              {handleClickDelete ? (
                Number(item) > 0 ? (
                  <SelectTag
                    key={item}
                    value={item}
                    selected={getIncludeValue(item, selectedList)}
                    onClick={Number(item) > 0 ? handleClickDelete : handleClick}
                    isRightIcon
                  >
                    {`${item}평`}
                    <DeleteIcon />
                  </SelectTag>
                ) : (
                  <SelectTag
                    key={item}
                    value={item}
                    selected={getIncludeValue(item, selectedList)}
                    onClick={handleClick}
                  >
                    {item}
                  </SelectTag>
                )
              ) : (
                <SelectTag key={item} value={item} selected={getIncludeValue(item, selectedList)} onClick={handleClick}>
                  {Number(item) > 0 ? `${item}평` : item}
                </SelectTag>
              )}
            </motion.div>
          ))}
      </div>

      {list.find((item) => item === '잘 모르겠어요') && (
        <div tw="mt-6">
          <CheckBoxButton
            label="잘 모르겠어요"
            value="잘 모르겠어요"
            selected={getIncludeValue('잘 모르겠어요', selectedList)}
            handleClick={handleClick}
          />
        </div>
      )}
    </>
  );
}

export default memo(PyoungListField);
