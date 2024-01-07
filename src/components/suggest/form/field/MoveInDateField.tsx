import { memo, useRef } from 'react';

import { motion } from 'framer-motion';

import Dropdown from '@/components/molecules/Dropdown';

import DatePicker from '@/components/molecules/DatePicker';

import FIELD_ID from '../constants/fieldId';

type MoveInDateFieldProps = {
  isRender: boolean;
  moveInDate: Date | null;
  moveInDateType: string;
  handleChangeMoveInDate: (value: Date | null) => void;
  handleChangeMoveInDateType: (value: string) => void;
};

function MoveInDateField({
  isRender,
  moveInDate,
  moveInDateType,
  handleChangeMoveInDate,
  handleChangeMoveInDateType,
}: MoveInDateFieldProps) {
  const minDate = useRef(new Date());

  if (!isRender) return null;

  return (
    <div id={FIELD_ID.MoveInDate}>
      <motion.div
        tw="flex gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <DatePicker
          variant="outlined"
          tw="flex-1 min-w-0"
          placeholder="희망 입주일"
          value={moveInDate}
          minDate={minDate.current}
          onChange={(v) => handleChangeMoveInDate(v)}
          dateFormat="yyyy. MM. dd"
        />

        <Dropdown
          tw="flex-1 min-w-0"
          variant="outlined"
          value={moveInDateType}
          onChange={handleChangeMoveInDateType}
          placeholder="선택"
          suffix="입주"
        >
          {['이전', '이후', '당일'].map((item) => (
            <Dropdown.Option key={item} value={item}>
              {item} 입주
            </Dropdown.Option>
          ))}
        </Dropdown>
      </motion.div>
    </div>
  );
}

export default memo(MoveInDateField);
