import { Button, Label, Checkbox } from '@/components/atoms';

import { TextField } from '@/components/molecules';

import { BuyOrRent as BuyOrRentEnum } from '@/constants/enums';

import useForm from '../../hooks/useForm';

import useFormHandler from '../../hooks/useFormHandler';

export default function BuyOrRent() {
  const form = useForm();

  const selected = (value: BuyOrRentEnum) => form?.formData?.buyOrRent === value;

  const hasError = form?.formData?.emptyTextFields?.price;

  const { handleUpdateBuyOrRent, handleUpdatePrice, handleMonthlyRentFee, handleUpdateNegotiable } = useFormHandler();

  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">거래 종류 및 금액을 입력해 주세요.</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            value={BuyOrRentEnum.Buy.toString()}
            selected={selected(BuyOrRentEnum.Buy)}
            onClick={(e) => handleUpdateBuyOrRent(e)}
          >
            매매
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            value={BuyOrRentEnum.Jeonsae.toString()}
            selected={selected(BuyOrRentEnum.Jeonsae)}
            onClick={(e) => handleUpdateBuyOrRent(e)}
          >
            전월세
          </Button>
        </div>
      </div>
      <div tw="flex flex-col mt-7">
        {form?.formData?.buyOrRent === BuyOrRentEnum.Jeonsae && (
          <div tw="flex flex-col gap-4">
            <div>
              <TextField variant="outlined" hasError={hasError}>
                <TextField.PriceInput
                  label={form?.formData?.price ? '보증금' : '보증금 입력'}
                  value={form?.formData?.price}
                  onChange={(e) => handleUpdatePrice(e)}
                />
              </TextField>
              <TextField.PriceHelperMessage tw="mr-4">{form?.formData?.price ?? '0'}</TextField.PriceHelperMessage>
              {hasError && <TextField.ErrorMessage>보증금을 입력해 주세요.</TextField.ErrorMessage>}
            </div>
            <div>
              <TextField variant="outlined">
                <TextField.PriceInput
                  label={form?.formData?.monthlyRentFee ? '월차임' : '월차임 입력'}
                  value={form?.formData?.monthlyRentFee}
                  onChange={(e) => handleMonthlyRentFee(e)}
                />
              </TextField>
              <TextField.PriceHelperMessage tw="mr-4">
                {form?.formData?.monthlyRentFee ?? '0'}
              </TextField.PriceHelperMessage>
            </div>
          </div>
        )}
        {form?.formData?.buyOrRent === BuyOrRentEnum.Buy && (
          <div>
            <TextField variant="outlined" hasError={hasError} id="searchbar">
              <TextField.PriceInput
                label={form?.formData?.price ? '매매가' : '매매가 입력'}
                value={form?.formData?.price}
                onChange={(e) => handleUpdatePrice(e)}
              />
            </TextField>
            <TextField.PriceHelperMessage tw="mr-4">{form?.formData?.price ?? '0'}</TextField.PriceHelperMessage>
            {hasError && <TextField.ErrorMessage>매매가를 입력해 주세요.</TextField.ErrorMessage>}
          </div>
        )}
      </div>
      {!!form?.formData?.buyOrRent && (
        <>
          <div tw="mt-4">
            <Label
              checked={form?.formData?.negotiable}
              onChange={(e) => handleUpdateNegotiable(e)}
              label="금액 협의 가능해요."
              control={<Checkbox name="negotiable" />}
            />
          </div>
          <div tw="text-info text-gray-700 mt-4">
            실거래가를 참고하여 합리적 가격을 제시할 경우 거래가능성이 높아집니다.
          </div>
        </>
      )}
    </div>
  );
}
