import { Button } from '@/components/atoms';

export interface FloorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function Floor({ value, onChange }: FloorProps) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">관심있는 층수를 선택해 주세요</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === '저층'}
            onClick={() => onChange?.('저층')}
          >
            저층
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === '중층'}
            onClick={() => onChange?.('중층')}
          >
            중층
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === '고층'}
            onClick={() => onChange?.('고층')}
          >
            고층
          </Button>
        </div>
      </div>
    </div>
  );
}
