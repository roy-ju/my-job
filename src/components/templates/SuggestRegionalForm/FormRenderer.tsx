import { Separator } from '@/components/atoms';
import { SuggestRegionalForm } from '@/components/organisms';
import { useContext } from 'react';
import FormContext from './FormContext';

export const Forms = {
  // Region: 'region',
  BasicInfo: 'basicInfo',
  // BuyOrRent: 'buyOrRent',
  // Price: 'price',
  Area: 'area',
  Floor: 'floor',
  Purpose: 'purpose',
  Description: 'description',
  MoveInDate: 'moveInDate',
  Option: 'option',
};

interface Props {
  form: string;
}

export default function FormRenderer({ form }: Props) {
  const {
    region,
    onClickOpenRegionList,

    realestateType,
    onChangeRealestateType,

    buyOrRent,
    onChangeBuyOrRent,

    price,
    onChangePrice,

    monthlyRentFee,
    onChangeMonthlyRentFee,

    negotiable,
    onChangeNegotiable,

    investAmount,
    onChangeInvestAmount,

    minArea,
    onChangeMinArea,

    maxArea,
    onChangeMaxArea,

    purpose,
    onChangePurpose,

    moveInDate,
    onChangeMoveInDate,

    moveInDateType,
    onChangeMoveInDateType,

    description,
    onChangeDescription,

    emptyTextFields,

    interviewAvailabletimes,
    onChangeInterviewAvailabletimes,
  } = useContext(FormContext);

  switch (form) {
    case Forms.BasicInfo:
      return (
        <div id={Forms.BasicInfo}>
          <div tw="pt-7 pb-10 px-5 flex items-center font-bold [letter-spacing: -0.25px]">
            최소 10명의 중개사님에게 추천 요청이 발송됩니다.
            <br />
            간편하게 매물 추천 받고, 합의 여부를 선택해 보세요.
          </div>
          <Separator />
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Region region={region} onClickOpenRegionList={onClickOpenRegionList} />
          </div>
          <Separator />
          <div tw="pt-10 pb-7 px-5">
            <SuggestRegionalForm.RealestateType value={realestateType} onChange={onChangeRealestateType} />
          </div>
          <div tw="pt-7 pb-10 px-5">
            <SuggestRegionalForm.BuyOrRent
              value={buyOrRent}
              onChange={onChangeBuyOrRent}
              price={price}
              onChangePrice={onChangePrice}
              monthlyRentFee={monthlyRentFee}
              onChangeMonthlyRentFee={onChangeMonthlyRentFee}
              negotiable={negotiable}
              onChangeNegotiable={onChangeNegotiable}
              hasError={emptyTextFields?.price}
            />
          </div>
        </div>
      );

    case Forms.MoveInDate:
      return (
        <div id={Forms.MoveInDate}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.MoveInDate
              moveInDate={moveInDate}
              onChangeMoveInDate={onChangeMoveInDate}
              moveInDateType={moveInDateType}
              onChangeMoveInDateType={onChangeMoveInDateType}
            />
          </div>
        </div>
      );

    case Forms.Purpose:
      return (
        <div tw="py-10" id={Forms.Purpose}>
          <div tw="px-5">
            <SuggestRegionalForm.Purpose value={purpose} onChange={onChangePurpose} />
          </div>
          {purpose && (
            <div tw="mt-7 px-5">
              {purpose === '투자' && (
                <SuggestRegionalForm.InvestAmount
                  investAmount={investAmount}
                  onChangeInvestAmount={onChangeInvestAmount}
                  hasError={emptyTextFields?.investAmount}
                />
              )}
              {purpose === '실거주' && (
                <SuggestRegionalForm.MoveInDate
                  moveInDate={moveInDate}
                  onChangeMoveInDate={onChangeMoveInDate}
                  moveInDateType={moveInDateType}
                  onChangeMoveInDateType={onChangeMoveInDateType}
                />
              )}
            </div>
          )}
        </div>
      );

    case Forms.Option:
      return (
        <div id={Forms.Option}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Area
              minArea={minArea}
              onChangeMinArea={onChangeMinArea}
              maxArea={maxArea}
              onChangeMaxArea={onChangeMaxArea}
            />
          </div>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Description
              description={description}
              onChangeDescription={onChangeDescription}
              buyOrRent={buyOrRent}
            />
          </div>
          <div tw="pb-10 px-5">
            <SuggestRegionalForm.Interview
              interviewAvailabletimes={interviewAvailabletimes}
              onChangeInterviewAvailabletimes={onChangeInterviewAvailabletimes}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}
