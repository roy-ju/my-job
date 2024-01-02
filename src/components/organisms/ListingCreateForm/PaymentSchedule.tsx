import { Button, Numeral } from '@/components/atoms';
import { DebtSuccessionType } from '@/components/templates/ListingCreateForm/FormContext';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';
import sum from 'lodash/sum';
import { useMemo } from 'react';

export interface PaymentScheduleProps {
  onClickAddInterim?: () => void;
  showCalculator?: boolean;
  price?: string;
  debtSuccessionDeposit?: string;
  debtSuccessionMiscs?: DebtSuccessionType[];
  isAddButtonDisabled?: boolean;
}

export default function PaymentSchedule({
  onClickAddInterim,
  showCalculator = true,
  price: priceStr,
  debtSuccessionDeposit: debtSuccessionDepositStr,
  debtSuccessionMiscs,
  isAddButtonDisabled = false,
}: PaymentScheduleProps) {
  const price = convertPriceInputToNumber(priceStr);
  const debtSuccessionTotal = useMemo(() => {
    const deposit = convertPriceInputToNumber(debtSuccessionDepositStr);
    const miscTotal = sum(debtSuccessionMiscs?.map((item) => convertPriceInputToNumber(item.price))) ?? 0;
    return deposit + miscTotal;
  }, [debtSuccessionDepositStr, debtSuccessionMiscs]);

  return (
    <div tw="flex flex-col gap-6">
      <div tw="flex justify-between">
        <div tw="text-b1 leading-none font-bold">가격조건</div>
        {!isAddButtonDisabled && (
          <Button size="small" variant="outlined" onClick={onClickAddInterim}>
            중도금 추가
          </Button>
        )}
      </div>
      {showCalculator && (
        <div tw="flex flex-col gap-2">
          <div tw="p-5 bg-gray-200 rounded-lg">
            <div tw="text-b1 leading-none font-bold mb-5">네고시오 계산도우미</div>
            <div tw="flex flex-col gap-3">
              <div tw="flex justify-between">
                <div tw="text-b2 leading-4">희망가</div>
                <Numeral koreanNumber tw="text-b2 leading-4">
                  {price}
                </Numeral>
              </div>
              <div tw="flex justify-between">
                <div tw="text-b2 leading-4">채무승계금액</div>
                <div tw="text-b2 leading-4">
                  - <Numeral koreanNumber>{debtSuccessionTotal}</Numeral>
                </div>
              </div>
              <div tw="flex justify-between">
                <div tw="text-b2 leading-4 font-bold text-nego-1000">실제 지급 총액</div>
                <div tw="text-b2 leading-4 font-bold text-nego-1000">
                  = <Numeral koreanNumber>{price - debtSuccessionTotal}</Numeral>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
