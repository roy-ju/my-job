import { DatePicker, Dropdown } from '@/components/molecules';
import { useRef } from 'react';
import useForm from '../hooks/useForm';
import useFormHandler from '../hooks/useFormHandler';

export default function MoveInDate() {
  const minDate = useRef(new Date());

  const form = useForm();

  const moveInDate = form?.formData?.moveInDate;

  const moveInDateType = form?.formData?.moveInDateType;

  const { handleUpdateMoveInDate, handleUpdateMoveInDateType } = useFormHandler();

  return (
    <div>
      <div tw="font-bold mb-4">언제 입주하시기를 원하시나요?</div>
      <div tw="flex gap-3">
        <DatePicker
          variant="outlined"
          tw="flex-1 min-w-0"
          placeholder="날짜"
          value={moveInDate}
          minDate={minDate.current}
          onChange={(v) => handleUpdateMoveInDate(v)}
        />
        <Dropdown tw="flex-1 min-w-0" variant="outlined" value={moveInDateType} onChange={handleUpdateMoveInDateType}>
          <Dropdown.Option value="이전">이전</Dropdown.Option>
          <Dropdown.Option value="이후">이후</Dropdown.Option>
          <Dropdown.Option value="당일">당일</Dropdown.Option>
        </Dropdown>
      </div>
    </div>
  );
}
