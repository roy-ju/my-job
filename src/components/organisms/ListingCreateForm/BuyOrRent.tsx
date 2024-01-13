import { Button } from '@/components/atoms';
import useControlled from '@/hooks/useControlled';
import { BuyOrRent as BuyOrRentType } from '@/constants/enums';
import { useCallback } from 'react';

interface BuyOrRentProps {
  value?: number;
  onChange?: (value: number) => void;
}

export default function BuyOrRent({ value: valueProp, onChange }: BuyOrRentProps) {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: 0,
  });

  const handleChange = useCallback(
    (v: number) => {
      setValue(v);
      onChange?.(v);
    },
    [setValue, onChange],
  );

  return (
    <div>
      <div tw="text-b1 leading-none font-bold mb-3">거래 종류</div>
      <div tw="text-info text-gray-700">전세와 월세는 이후에도 전환이 가능합니다.</div>
      <div tw="flex gap-3 mt-4">
        <Button
          size="bigger"
          variant="outlined"
          tw="flex-1"
          selected={value === BuyOrRentType.Buy}
          onClick={() => handleChange(BuyOrRentType.Buy)}
        >
          매매
        </Button>
        <Button
          size="bigger"
          variant="outlined"
          tw="flex-1"
          selected={value === BuyOrRentType.Jeonsae}
          onClick={() => handleChange(BuyOrRentType.Jeonsae)}
        >
          전세
        </Button>
        <Button
          size="bigger"
          variant="outlined"
          tw="flex-1"
          selected={value === BuyOrRentType.Wolsae}
          onClick={() => handleChange(BuyOrRentType.Wolsae)}
        >
          월세
        </Button>
      </div>
    </div>
  );
}
