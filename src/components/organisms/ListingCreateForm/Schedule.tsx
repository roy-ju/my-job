import { Label, Radio } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';

export default function Schedule() {
  return (
    <div>
      <div>
        <div tw="flex justify-between mb-4">
          <div tw="text-info">일정</div>
        </div>
        <div tw="flex gap-4 mb-4">
          <Label control={<Radio />} label="협의 후 결정" />
          <Label control={<Radio />} label="날짜 지정" />
        </div>
        <div tw="flex gap-3">
          <Dropdown tw="flex-1" variant="outlined" placeholder="날짜 선택" />
          <Dropdown tw="flex-1" variant="outlined" placeholder="이전" />
        </div>
      </div>
    </div>
  );
}
