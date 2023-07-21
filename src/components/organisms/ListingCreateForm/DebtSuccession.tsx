import { RadioGroup, TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { ChangeEvent, ChangeEventHandler, useCallback } from 'react';
import QuestionIcon from '@/assets/icons/question.svg';
import { Button, Label, Radio } from '@/components/atoms';
import RemoveIcon from '@/assets/icons/remove.svg';
import useTooltip from '@/states/tooltip';

interface DepositProps {
  deposit?: string;
  hasDebtSuccession?: string;
  monthlyRentFee?: string;
  isAddButtonDisabled?: boolean;
  onChangeDeposit?: (newValue: string) => void;
  onChangeHasDebtSuccession?: (newValue: string) => void;
  onClickAdd?: () => void;
}

function Deposit({
  deposit: depositProp,
  hasDebtSuccession: hasDebtSuccessionProp,
  isAddButtonDisabled,
  onChangeDeposit,
  onChangeHasDebtSuccession,
  onClickAdd,
}: DepositProps) {
  const { openTooltip } = useTooltip();

  const [deposit, setDeposit] = useControlled({ controlled: depositProp, default: '' });

  const [hasDebtSuccession, setHasDebtSuccession] = useControlled({ controlled: hasDebtSuccessionProp, default: '0' });

  const handleChangePrice = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setDeposit(e.target.value);
      onChangeDeposit?.(e.target.value);
    },
    [setDeposit, onChangeDeposit],
  );

  const handleChangeHasDebtSuccession = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setHasDebtSuccession(e.target.value);
      onChangeHasDebtSuccession?.(e.target.value);
    },
    [setHasDebtSuccession, onChangeHasDebtSuccession],
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
          <div tw="text-info text-gray-700">
            계약 시의 채무승계 금액을 입력해 주세요.
            <br />
            잔금일 전 말소 예정인 경우 입력이 필요하지 않습니다.
          </div>
        </div>
        {!isAddButtonDisabled && hasDebtSuccession === '1' && (
          <Button variant="outlined" size="small" onClick={onClickAdd}>
            채무추가
          </Button>
        )}
      </div>
      <RadioGroup tw="flex gap-4 mt-3" value={hasDebtSuccession} onChange={handleChangeHasDebtSuccession}>
        <Label control={<Radio />} value="0" label="없음" />
        <Label control={<Radio />} value="1" label="있음" />
      </RadioGroup>
      {hasDebtSuccession === '1' && (
        <div tw="mt-3 flex flex-col gap-4">
          <div>
            <TextField variant="outlined">
              <TextField.PriceInput label="보증금" value={deposit} onChange={handleChangePrice} />
            </TextField>
            <TextField.PriceHelperMessage tw="mr-4">{deposit}</TextField.PriceHelperMessage>
          </div>
        </div>
      )}
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