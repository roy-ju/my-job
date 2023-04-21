import { Button } from '@/components/atoms';
import { TextField } from '@/components/molecules';

export default function Area() {
  return (
    <div>
      <div tw="mb-4 flex items-center justify-between">
        <div tw="font-bold">관심있는 평수를 선택해 주세요</div>
        <Button size="none" variant="ghost" tw="underline">
          건너뛰기
        </Button>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="text-info">최소 평 수</div>
        <TextField variant="outlined">
          <TextField.PriceInput suffix="평" label="평 수" />
        </TextField>
        <div tw="text-info">최대 평 수</div>
        <TextField variant="outlined">
          <TextField.PriceInput suffix="평" label="평 수" />
        </TextField>
      </div>
    </div>
  );
}
