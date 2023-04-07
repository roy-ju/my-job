import { TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback } from 'react';
import QuestionIcon from '@/assets/icons/question.svg';
import { Button } from '@/components/atoms';

interface DebtSuccessionProps {
  deposit?: string;
  monthlyRentFee?: string;
  onChangeDeposit?: (newValue: string) => void;
  onChangeMonthlyRentFee?: (newValue: string) => void;
  onClickQuestion?: () => void;
}

export default function DebtSuccession({
  deposit: depositProp,
  onChangeDeposit,
  onClickQuestion,
}: DebtSuccessionProps) {
  const [deposit, setDeposit] = useControlled({ controlled: depositProp, default: '' });

  const handleChangePrice = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setDeposit(e.target.value);
      onChangeDeposit?.(e.target.value);
    },
    [setDeposit, onChangeDeposit],
  );

  return (
    <div>
      <div tw="flex items-start justify-between">
        <div>
          <div tw="mb-3 flex items-center gap-1">
            <div tw="text-b1 leading-none font-bold">채무승계 희망금액</div>
            <Button variant="ghost" size="none" tw="pb-px" onClick={onClickQuestion}>
              <QuestionIcon />
            </Button>
          </div>
          <div tw="text-info text-gray-700">관련된 채무가 없다면 다음을 누르세요.</div>
        </div>
        <Button variant="outlined" size="small">
          채무추가
        </Button>
      </div>
      <div tw="mt-3 flex flex-col gap-4">
        <TextField variant="outlined">
          <TextField.Input label="보증금" value={deposit} onChange={handleChangePrice} />
        </TextField>
      </div>
    </div>
  );
}
