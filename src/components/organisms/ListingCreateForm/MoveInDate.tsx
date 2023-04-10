import { Label, Radio } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';

export default function MoveInDate() {
  return (
    <div>
      <div>
        <div tw="flex justify-between mb-3">
          <div tw="text-b1 leading-none font-bold">입주 가능 시기</div>
        </div>
        <div tw="flex gap-4 mb-4">
          <Label control={<Radio />} label="즉시 입주 가능" />
          <Label control={<Radio />} label="날짜 지정" />
        </div>
        <div tw="flex gap-3">
          <Dropdown tw="flex-1 min-w-0" variant="outlined" value="날짜 선택" />
          <Dropdown tw="flex-1 min-w-0" variant="outlined" value="이후" />
        </div>
      </div>
    </div>
  );
}
