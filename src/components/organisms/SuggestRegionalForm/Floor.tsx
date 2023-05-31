import { Button } from '@/components/atoms';
import { useControlled } from '@/hooks/utils';
import { useCallback } from 'react';

export interface FloorProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const defaultValue: string[] = [];

export default function Floor({ value: valueProp, onChange }: FloorProps) {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
  });

  const handleClick = useCallback(
    (type: string) => {
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
        <div tw="font-bold">관심있는 층수를 선택해 주세요. (복수선택)</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value.includes('저층')}
            onClick={() => handleClick?.('저층')}
          >
            저층
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value.includes('중층')}
            onClick={() => handleClick?.('중층')}
          >
            중층
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value.includes('고층')}
            onClick={() => handleClick?.('고층')}
          >
            고층
          </Button>
        </div>
      </div>
    </div>
  );
}
