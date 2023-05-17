import { TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { ChangeEvent, ChangeEventHandler, useCallback } from 'react';
import QuestionIcon from '@/assets/icons/question.svg';
import { Button } from '@/components/atoms';
import RemoveIcon from '@/assets/icons/remove.svg';
import useTooltip from '@/states/tooltip';

interface DepositProps {
  deposit?: string;
  monthlyRentFee?: string;
  isAddButtonDisabled?: boolean;
  onChangeDeposit?: (newValue: string) => void;
  onClickAdd?: () => void;
}

function Deposit({ deposit: depositProp, isAddButtonDisabled, onChangeDeposit, onClickAdd }: DepositProps) {
  const { openTooltip } = useTooltip();

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
            <Button variant="ghost" size="none" tw="pb-px" onClick={() => openTooltip('debtSuccessions')}>
              <QuestionIcon />
            </Button>
          </div>
          <div tw="text-info text-gray-700">관련된 채무가 없다면 다음을 누르세요.</div>
        </div>
        {!isAddButtonDisabled && (
          <Button variant="outlined" size="small" onClick={onClickAdd}>
            채무추가
          </Button>
        )}
      </div>
      <div tw="mt-3 flex flex-col gap-4">
        <div>
          <TextField variant="outlined">
            <TextField.PriceInput label="보증금" value={deposit} onChange={handleChangePrice} />
          </TextField>
          <TextField.PriceHelperMessage tw="mr-4">{deposit}</TextField.PriceHelperMessage>
        </div>
      </div>
    </div>
  );
}

interface MiscellaneousProps {
  index?: number;
  name?: string;
  price?: string;
  onChangeName?: (value: string) => void;
  onChangePrice?: (value: string) => void;
  onClickRemove?: () => void;
}

function Miscellaneous({ index, name, price, onChangeName, onChangePrice, onClickRemove }: MiscellaneousProps) {
  return (
    <div>
      <div tw="flex items-center gap-1">
        <Button variant="ghost" size="none" onClick={onClickRemove}>
          <RemoveIcon />
        </Button>
        <div tw="text-info">기타채무 {(index ?? 0) + 1}</div>
      </div>
      <div tw="flex flex-col gap-4 mt-4">
        <TextField variant="outlined">
          <TextField.Input
            label="채무내용"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeName?.(e.target.value)}
          />
        </TextField>
        <TextField variant="outlined">
          <TextField.PriceInput
            label="금액"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangePrice?.(e.target.value)}
          />
        </TextField>
      </div>
    </div>
  );
}

export default Object.assign(Deposit, { Miscellaneous });
