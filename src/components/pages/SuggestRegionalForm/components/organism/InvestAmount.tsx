import { TextField } from '@/components/molecules';

import useForm from '../../hooks/useForm';

import useFormHandler from '../../hooks/useFormHandler';

export default function InvestAmount() {
  const form = useForm();

  const investAmount = form?.formData?.investAmount;

  const hasError = form?.formData?.emptyTextFields?.price;

  const { handleUpdateInvestAmount } = useFormHandler();

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
              onChange={(e) => handleUpdateInvestAmount(e)}
            />
          </TextField>
          <TextField.PriceHelperMessage tw="mr-4">{investAmount ?? '0'}</TextField.PriceHelperMessage>
          {hasError && <TextField.ErrorMessage>투자 예산을 입력해주세요.</TextField.ErrorMessage>}
        </div>
      </div>
    </div>
  );
}
