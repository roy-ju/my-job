import { Button } from '@/components/atoms';
import { RealestateType as RealestateTypeType } from '@/constants/enums';
import { useControlled } from '@/hooks/utils';
import { useCallback } from 'react';

export interface RealestateTypeProps {
  value?: number[];
  onChange?: (value: number[]) => void;
}

const defaultValue: number[] = [];

export default function RealestateType({ value: valueProp, onChange }: RealestateTypeProps) {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
  });

  const handleClick = useCallback(
    (type: number) => {
      let newValue = [...value];
      if (newValue.includes(type)) {
        newValue = newValue.filter((item) => item !== type);
      } else {
        newValue.push(type);
      }
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange, value, setValue],
  );

  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">매물의 부동산종류를 선택해 주세요. (복수선택)</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value.includes(RealestateTypeType.Apartment)}
            onClick={() => handleClick?.(RealestateTypeType.Apartment)}
          >
            아파트
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value.includes(RealestateTypeType.Officetel)}
            onClick={() => handleClick?.(RealestateTypeType.Officetel)}
          >
            오피스텔
          </Button>
        </div>
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value.includes(RealestateTypeType.Dandok)}
            onClick={() => handleClick?.(RealestateTypeType.Dandok)}
          >
            단독
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value.includes(RealestateTypeType.Dagagoo)}
            onClick={() => handleClick?.(RealestateTypeType.Dagagoo)}
          >
            다가구
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value.includes(RealestateTypeType.Dasaedae)}
            onClick={() => handleClick?.(RealestateTypeType.Dasaedae)}
          >
            빌라
          </Button>
        </div>
      </div>
    </div>
  );
}
