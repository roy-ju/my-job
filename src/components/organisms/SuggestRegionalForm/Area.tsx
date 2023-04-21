import { TextField } from '@/components/molecules';

interface Props {
  minArea?: string;
  onChangeMinArea?: (value: string) => void;

  maxArea?: string;
  onChangeMaxArea?: (value: string) => void;
}

export default function Area({ minArea, onChangeMinArea, maxArea, onChangeMaxArea }: Props) {
  return (
    <div>
      <div tw="mb-4 flex items-center justify-between">
        <div tw="font-bold">관심있는 평수를 선택해 주세요 (선택)</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="text-info">최소 평 수</div>
        <TextField variant="outlined">
          <TextField.PriceInput
            suffix="평"
            label="평 수"
            value={minArea}
            onChange={(e) => onChangeMinArea?.(e.target.value)}
          />
        </TextField>
        <div tw="text-info">최대 평 수</div>
        <TextField variant="outlined">
          <TextField.PriceInput
            suffix="평"
            label="평 수"
            value={maxArea}
            onChange={(e) => onChangeMaxArea?.(e.target.value)}
          />
        </TextField>
      </div>
    </div>
  );
}
