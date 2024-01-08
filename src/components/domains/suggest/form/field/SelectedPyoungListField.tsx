import { memo } from 'react';

import { motion } from 'framer-motion';

import DeleteIcon from '@/assets/icons/delete_nego.svg';

import SelectButton from '../ui/SelectButton';

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
          <SelectButton key={item} variant="primaryOutline" value={item} selected tw="flex items-center gap-1 pr-1.5">
            {Number(item) > 0 ? `${item}평` : item}
            <DeleteIcon onClick={() => handleClick(item)} />
          </SelectButton>
        </motion.div>
      ))}
    </div>
  );
}

export default memo(SelectedPyoungListField);
