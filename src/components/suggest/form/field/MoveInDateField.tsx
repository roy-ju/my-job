import { memo, useRef } from 'react';

import { motion } from 'framer-motion';

import Dropdown from '@/components/molecules/Dropdown';

import DatePicker from '@/components/molecules/DatePicker';

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
  console.log('render MoveInDateField');
  const minDate = useRef(new Date());

  if (!isRender) return null;

  return (
    <div id="move_in_data_field">
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
        />

        <Dropdown
          tw="flex-1 min-w-0"
          variant="outlined"
          value={moveInDateType}
          onChange={handleChangeMoveInDateType}
          placeholder="선택"
        >
          <Dropdown.Option value="이전">이전</Dropdown.Option>
          <Dropdown.Option value="이후">이후</Dropdown.Option>
          <Dropdown.Option value="당일">당일</Dropdown.Option>
        </Dropdown>
      </motion.div>
    </div>
  );
}

export default memo(MoveInDateField);
