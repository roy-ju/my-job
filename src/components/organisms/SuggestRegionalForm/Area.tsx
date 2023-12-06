import { TextField } from '@/components/molecules';

interface Props {
  minArea?: string;
  onChangeMinArea?: (value: string) => void;

  maxArea?: string;
  onChangeMaxArea?: (value: string) => void;

  isRequired?: boolean;
}

export default function Area({ minArea, onChangeMinArea, maxArea, onChangeMaxArea, isRequired }: Props) {
  return (
    <div>
      <div tw="mb-4 flex items-center justify-between">
        <div tw="font-bold">
          {isRequired ? '관심있는 평수를 입력해 주세요.' : '관심있는 평수를 입력해 주세요. (선택)'}
        </div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="text-info">최소 평수</div>
        <TextField variant="outlined">
          <TextField.PriceInput
            suffix="평"
            label={minArea ? '평수' : '평수 입력'}
            value={minArea}
            onChange={(e) => onChangeMinArea?.(e.target.value)}
          />
        </TextField>
        <div tw="text-info">최대 평수</div>
        <TextField variant="outlined">
          <TextField.PriceInput
            suffix="평"
            label={maxArea ? '평수' : '평수 입력'}
            value={maxArea}
            onChange={(e) => onChangeMaxArea?.(e.target.value)}
          />
        </TextField>
      </div>
    </div>
  );
}
