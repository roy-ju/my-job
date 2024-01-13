import { useCallback } from 'react';

import { Button } from '@/components/atoms';

import useTooltip from '@/states/hooks/useTooltip';

import useControlled from '@/hooks/useControlled';

import QuestionIcon from '@/assets/icons/question.svg';

interface JeonsaeLoanProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  isJeonsae?: boolean;
}

export default function JeonsaeLoan({ value: valueProp, onChange, isJeonsae }: JeonsaeLoanProps) {
  const { openTooltip } = useTooltip();

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: true,
  });

  const handleChange = useCallback(
    (v: boolean) => {
      setValue(v);
      onChange?.(v);
    },
    [setValue, onChange],
  );

  return (
    <div>
      <div tw="text-b1 leading-none font-bold mb-3 flex items-center gap-1">
        {isJeonsae ? '전세자금 대출가능 여부' : '보증금 대출가능 여부'}
        <Button
          variant="ghost"
          size="none"
          tw="pb-px"
          onClick={() => openTooltip(isJeonsae ? 'jeonsaeLoan' : 'depositLoan')}
        >
          <QuestionIcon />
        </Button>
      </div>
      <div tw="flex gap-3 mt-4">
        <Button
          size="bigger"
          variant="outlined"
          tw="flex-1"
          selected={value === true}
          onClick={() => handleChange(true)}
        >
          가능
        </Button>
        <Button
          size="bigger"
          variant="outlined"
          tw="flex-1"
          selected={value === false}
          onClick={() => handleChange(false)}
        >
          불가능
        </Button>
      </div>
    </div>
  );
}
