import { Button } from '@/components/atoms';
import { BuyOrRent as BuyOrRentType } from '@/constants/enums';

export interface BuyOrRentProps {
  value?: number;
  onChange?: (value: number) => void;
}

export default function BuyOrRent({ value, onChange }: BuyOrRentProps) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">매물의 거래 종류를 선택해 주세요.</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === BuyOrRentType.Buy}
            onClick={() => onChange?.(BuyOrRentType.Buy)}
          >
            매매
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === BuyOrRentType.Jeonsae}
            onClick={() => onChange?.(BuyOrRentType.Jeonsae)}
          >
            전월세
          </Button>
        </div>
      </div>
    </div>
  );
}
