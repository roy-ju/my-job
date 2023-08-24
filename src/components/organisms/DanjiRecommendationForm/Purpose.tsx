import { Button } from '@/components/atoms';

export interface PurposeProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function Purpose({ value, onChange }: PurposeProps) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">매매거래의 목적은 무엇인가요?</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === '실거주'}
            onClick={() => onChange?.('실거주')}
          >
            실거주
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === '투자'}
            onClick={() => onChange?.('투자')}
          >
            투자
          </Button>
        </div>
      </div>
    </div>
  );
}
