import { ChangeEvent, useState } from 'react';

import { Checkbox, Label } from '@/components/atoms';

import { TextField } from '@/components/molecules';

export default function Form({
  deregisterReasons = [],
  onChangeCheckbox,
  extraReasons,
  onChangeTextArea,
}: {
  deregisterReasons?: string[];
  extraReasons?: string;
  onChangeTextArea?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeCheckbox?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [isExtraCheckboxChecked, setIsExtraCheckboxChecked] = useState(false);

  return (
    <div tw="flex flex-col gap-8">
      <Label
        checked={deregisterReasons.includes('집을 보러오는 매수(임차)인이 없어요')}
        onChange={onChangeCheckbox}
        label="집을 보러오는 매수(임차)인이 없어요"
        control={<Checkbox name="집을 보러오는 매수(임차)인이 없어요" />}
      />
      <Label
        checked={deregisterReasons.includes('원하는 매물이 없어요')}
        onChange={onChangeCheckbox}
        label="원하는 매물이 없어요"
        control={<Checkbox name="원하는 매물이 없어요" />}
      />
      <Label
        checked={deregisterReasons.includes('비매너 이용자가 있어요')}
        onChange={onChangeCheckbox}
        label="비매너 이용자가 있어요"
        control={<Checkbox name="비매너 이용자가 있어요" />}
      />
      <Label
        checked={deregisterReasons.includes('중개사가 불만이에요')}
        onChange={onChangeCheckbox}
        label="중개사가 불만이에요"
        control={<Checkbox name="중개사가 불만이에요" />}
      />
      <Label
        checked={deregisterReasons.includes('서비스 이용이 불편해요')}
        onChange={onChangeCheckbox}
        label="서비스 이용이 불편해요"
        control={<Checkbox name="서비스 이용이 불편해요" />}
      />
      <Label
        checked={deregisterReasons.includes('잦은 오류가 발생해요')}
        onChange={onChangeCheckbox}
        label="잦은 오류가 발생해요"
        control={<Checkbox name="잦은 오류가 발생해요" />}
      />
      <Label
        checked={deregisterReasons.includes('대체할 만한 서비스를 찾았어요')}
        onChange={onChangeCheckbox}
        label="대체할 만한 서비스를 찾았어요"
        control={<Checkbox name="대체할 만한 서비스를 찾았어요" />}
      />
      <div tw="flex flex-col gap-4">
        <Label
          onChange={() => {
            setIsExtraCheckboxChecked(!isExtraCheckboxChecked);
          }}
          checked={isExtraCheckboxChecked || !!extraReasons}
          label="기타"
          control={<Checkbox />}
        />
        <TextField variant="outlined" size="medium">
          <TextField.TextArea
            value={extraReasons}
            onChange={onChangeTextArea}
            placeholder="내용을 입력하세요"
            tw="min-h-[160px] max-h-[160px]"
          />
        </TextField>
        <TextField.HelperMessage tw="text-right text-gray-1000 mt-0">
          {extraReasons?.length} / 200
        </TextField.HelperMessage>
      </div>
    </div>
  );
}
