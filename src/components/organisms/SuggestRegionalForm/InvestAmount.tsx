import { TextField } from '@/components/molecules';

export interface InvestAmountProps {
  buyOrRent?: number;
  investAmount?: string;
  onChangeInvestAmount?: (value: string) => void;
  hasError?: boolean;
}

export default function InvestAmount({ investAmount, onChangeInvestAmount, hasError }: InvestAmountProps) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold mb-1">투자 예산은 얼마인가요?</div>
        <div tw="text-gray-700 text-info">전세 보증금을 제외한 실투자예산을 입력해 주세요.</div>
      </div>
      <div tw="flex flex-col">
        <div>
          <TextField variant="outlined" hasError={hasError}>
            <TextField.PriceInput
              label={investAmount ? '투자 예산' : '투자 예산 입력'}
              value={investAmount}
              onChange={(e) => onChangeInvestAmount?.(e.target.value)}
            />
          </TextField>
          <TextField.PriceHelperMessage tw="mr-4">{investAmount ?? '0'}</TextField.PriceHelperMessage>
          {hasError && <TextField.ErrorMessage>투자 예산을 입력해주세요.</TextField.ErrorMessage>}
        </div>
      </div>
    </div>
  );
}
