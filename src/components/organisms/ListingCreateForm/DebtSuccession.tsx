import { ChangeEvent, ChangeEventHandler, useCallback } from 'react';

import { Button, Label, Radio } from '@/components/atoms';

import { RadioGroup, TextField } from '@/components/molecules';

import useTooltip from '@/states/hooks/useTooltip';

import useControlled from '@/hooks/useControlled';

import QuestionIcon from '@/assets/icons/question.svg';

import RemoveIcon from '@/assets/icons/remove.svg';

import CloseContained from '@/assets/icons/close_contained.svg';

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
  onChangeDeposit,
  onChangeHasDebtSuccession,
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

  const handleDeletePrice = useCallback(() => {
    setDeposit('');
    onChangeDeposit?.('');
  }, [setDeposit, onChangeDeposit]);

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
            <div tw="text-b1 leading-none font-bold">담보/보증금 채무승계</div>
            <Button variant="ghost" size="none" tw="pb-px" onClick={() => openTooltip('debtSuccessions')}>
              <QuestionIcon />
            </Button>
          </div>
          <div tw="text-info text-gray-700">
            계약 시의 채무승계 금액을 입력해 주세요.
            <br />
            계약 완료 전 말소 예정인 내용은 입력하지 않아도 돼요.
          </div>
        </div>
      </div>
      <RadioGroup tw="flex gap-4 mt-3" value={hasDebtSuccession} onChange={handleChangeHasDebtSuccession}>
        <Label control={<Radio />} value="0" label="없음" />
        <Label control={<Radio />} value="1" label="있음" />
      </RadioGroup>
      {hasDebtSuccession === '1' && (
        <div tw="mt-3 flex flex-col gap-4">
          <div>
            <TextField variant="outlined">
              <TextField.PriceInput
                label={deposit ? '보증금' : '보증금 입력'}
                value={deposit}
                onChange={handleChangePrice}
              />
              {deposit && (
                <TextField.Trailing tw="absolute right-12 bottom-3 cursor-pointer" onClick={handleDeletePrice}>
                  <CloseContained />
                </TextField.Trailing>
              )}
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
  const handleDeleteName = useCallback(() => {
    onChangeName?.('');
  }, [onChangeName]);

  const handleDeletePrice = useCallback(() => {
    onChangePrice?.('');
  }, [onChangePrice]);

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
            label={name ? '내용' : '내용 입력'}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeName?.(e.target.value)}
          />
          {name && (
            <TextField.Trailing tw="absolute right-1.5 bottom-3 cursor-pointer" onClick={handleDeleteName}>
              <CloseContained />
            </TextField.Trailing>
          )}
        </TextField>
        <TextField variant="outlined">
          <TextField.PriceInput
            label={price ? '금액' : '금액 입력'}
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangePrice?.(e.target.value)}
          />
          {price && (
            <TextField.Trailing tw="absolute right-12 bottom-3 cursor-pointer" onClick={handleDeletePrice}>
              <CloseContained />
            </TextField.Trailing>
          )}
        </TextField>
        {price && <TextField.PriceHelperMessage tw="mr-4">{price}</TextField.PriceHelperMessage>}
      </div>
    </div>
  );
}

export default Object.assign(Deposit, { Miscellaneous });
