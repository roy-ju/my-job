import { memo } from 'react';

import { motion } from 'framer-motion';

import DeleteIcon from '@/assets/icons/delete_nego.svg';

import SelectTag from '@/components/atoms/SelectTag';

import FIELD_ID from '../constants/fieldId';

type SelectedPyoungListFieldProps = {
  isRender: boolean;
  list: string[];
  handleClick: (value: string) => void;
};

function SelectedPyoungListField({ isRender, list, handleClick }: SelectedPyoungListFieldProps) {
  if (!isRender) return null;

  return (
    <div id={FIELD_ID.SelectedPyoungList} tw="flex flex-row flex-wrap items-center gap-3 mt-6">
      {list.map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
        >
          <SelectTag key={item} value={item} selected isRightIcon>
            {Number(item) > 0 ? `${item}평` : item}
            <DeleteIcon onClick={() => handleClick(item)} />
          </SelectTag>
        </motion.div>
      ))}
    </div>
  );
}

export default memo(SelectedPyoungListField);
