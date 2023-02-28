import { Checkbox } from '@/components/atoms/Checkbox';
import { useState } from 'react';

type Props = {
  /** 제목 */
  title?: string;
  /** 체크할 항목들의 배열 */
  value: any[];
  /** 체크한 항목들이 바뀔 때 호출할 함수. 파라미터로 현재 체크된 항목들이 들어갑니다. */
  onChangeValue: (checkedValue?: any[]) => void;
};

export function CheckboxField({ title, value, onChangeValue }: Props) {
  const [selectedValue, setSelectedValue] = useState<any[]>([]);

  let checkedValueArr: any[] = [...selectedValue];

  const onChangeCheckbox = (v: any, checked: boolean) => {
    if (!checked) {
      checkedValueArr.push(v);
    } else {
      checkedValueArr = checkedValueArr.filter((i) => v !== i);
    }
    setSelectedValue(checkedValueArr);
    onChangeValue(checkedValueArr);
  };

  return (
    <div tw="w-fit h-fit flex flex-col gap-5">
      <span tw="text-b1 font-bold">{title}</span>
      <div tw="flex items-center gap-4">
        {value.map((v) => (
          <Checkbox key={v} text={v} onChange={onChangeCheckbox} />
        ))}
      </div>
    </div>
  );
}
