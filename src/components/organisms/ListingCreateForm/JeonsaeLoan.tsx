import { Button } from '@/components/atoms';
import { useControlled } from '@/hooks/utils';
import { BuyOrRent as BuyOrRentType } from '@/constants/enums';
import { useCallback } from 'react';
import QuestionIcon from '@/assets/icons/question.svg';

interface JeonsaeLoanProps {
  value?: number;
  onChange?: (value: number) => void;
  isJeonsae?: boolean;
  onClickQuestion?: () => void;
}

export default function JeonsaeLoan({ value: valueProp, onChange, isJeonsae, onClickQuestion }: JeonsaeLoanProps) {
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
      <div tw="text-b1 leading-none font-bold mb-3 flex items-center gap-1">
        {isJeonsae ? '전세자금 대출가능 여부' : '보증금 대출가능 여부'}
        <Button variant="ghost" size="none" tw="pb-px" onClick={onClickQuestion}>
          <QuestionIcon />
        </Button>
      </div>
      <div tw="flex gap-3 mt-4">
        <Button
          size="bigger"
          variant="outlined"
          tw="flex-1"
          selected={value === BuyOrRentType.Jeonsae}
          onClick={() => handleChange(BuyOrRentType.Jeonsae)}
        >
          가능
        </Button>
        <Button
          size="bigger"
          variant="outlined"
          tw="flex-1"
          selected={value === BuyOrRentType.Wolsae}
          onClick={() => handleChange(BuyOrRentType.Wolsae)}
        >
          불가능
        </Button>
      </div>
    </div>
  );
}
