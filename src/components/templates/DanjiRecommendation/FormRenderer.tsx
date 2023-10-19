import { Separator } from '@/components/atoms';
import { DanjiRecommendationForm } from '@/components/organisms';
import { useContext } from 'react';
import FormContext from './FormContext';

export const Forms = {
  Danji: 'danji',
  RealestateType: 'realestateType',
  BuyOrRent: 'buyOrRent',
  Price: 'price',
  Area: 'area',
  InvestAmount: 'investAmount',
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
    danji,
    onClickOpenDanjiList,
    buyOrRent,
    onChangeBuyOrRent,
    price,
    onChangePrice,
    monthlyRentFee,
    onChangeMonthlyRentFee,
    quickSale,
    onChangeQuickSale,
    investAmount,
    onChangeInvestAmount,
    negotiable,
    onChangeNegotiable,
    pyoungList,
    purpose,
    onChangePurpose,
    moveInDate,
    onChangeMoveInDate,
    moveInDateType,
    onChangeMoveInDateType,
    description,
    onChangeDescription,
    pyoungInputValue,
    onChangePyoungInputValue,
    interviewAvailabletimes,
    onChangeInterviewAvailabletimes,

    danjiRealPricesPyoungList,
    onClickPyoungDeleteIcon,
    onClickPyoungAddIcon,
    onClickPyoungButton,
    onClickPyoungCloseButton,
    emptyTextFields,
    isEntryDanji,
  } = useContext(FormContext);

  switch (form) {
    case Forms.Danji:
      return (
        <div id={Forms.Danji}>
          <div tw="pt-7 pb-10 px-5 flex items-center font-bold [letter-spacing: -0.25px]">
            최소 10명의 중개사님에게 추천 요청이 발송됩니다.
            <br />
            간편하게 매물 추천 받고, 합의 여부를 선택해 보세요.
          </div>
          <Separator />
          <div tw="py-10 px-5">
            <DanjiRecommendationForm.Danji danji={danji} onClickOpenDanjiList={onClickOpenDanjiList} />
          </div>
        </div>
      );

    case Forms.BuyOrRent:
      return (
        <div id={Forms.BuyOrRent}>
          {isEntryDanji && (
            <>
              <div tw="pt-7 pb-10 px-5 flex items-center font-bold [letter-spacing: -0.25px]">
                최소 10명의 중개사님에게 추천 요청이 발송됩니다.
                <br />
                간편하게 매물 추천 받고, 합의 여부를 선택해 보세요.
              </div>
              <Separator />
            </>
          )}
          <div tw="py-10 px-5">
            <DanjiRecommendationForm.BuyOrRent
              value={buyOrRent}
              onChange={onChangeBuyOrRent}
              price={price}
              onChangePrice={onChangePrice}
              monthlyRentFee={monthlyRentFee}
              onChangeMonthlyRentFee={onChangeMonthlyRentFee}
              quickSale={quickSale}
              onChangeQuickSale={onChangeQuickSale}
              negotiable={negotiable}
              onChangeNegotiable={onChangeNegotiable}
              hasError={emptyTextFields?.price}
            />
          </div>
        </div>
      );

    case Forms.Purpose:
      return (
        <div tw="py-10" id={Forms.Purpose}>
          <div tw="px-5">
            <DanjiRecommendationForm.Purpose value={purpose} onChange={onChangePurpose} />
          </div>
          {purpose && (
            <div tw="mt-7 px-5">
              {purpose === '투자' && (
                <DanjiRecommendationForm.InvestAmount
                  investAmount={investAmount}
                  onChangeInvestAmount={onChangeInvestAmount}
                  hasError={emptyTextFields?.investAmount}
                />
              )}
              {purpose === '실거주' && (
                <DanjiRecommendationForm.MoveInDate
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

    case Forms.MoveInDate:
      return (
        <div id={Forms.MoveInDate}>
          <div tw="py-10 px-5">
            <DanjiRecommendationForm.MoveInDate
              moveInDate={moveInDate}
              onChangeMoveInDate={onChangeMoveInDate}
              moveInDateType={moveInDateType}
              onChangeMoveInDateType={onChangeMoveInDateType}
            />
          </div>
        </div>
      );

    case Forms.Option:
      return (
        <div id={Forms.Option}>
          <div tw="pt-10 px-5">
            <DanjiRecommendationForm.Area
              danjiRealPricesPyoungList={danjiRealPricesPyoungList}
              selectedGonggeupPyoungList={pyoungList}
              pyoungInputValue={pyoungInputValue}
              onChangePyoungField={onChangePyoungInputValue}
              onClickPyoungDeleteIcon={onClickPyoungDeleteIcon}
              onClickPyoungAddIcon={onClickPyoungAddIcon}
              onClickPyoungButton={onClickPyoungButton}
              onClickPyoungCloseButton={onClickPyoungCloseButton}
            />
          </div>
          <div tw="py-10 px-5">
            <DanjiRecommendationForm.Description
              description={description}
              onChangeDescription={onChangeDescription}
              buyOrRent={buyOrRent}
            />
          </div>
          <Separator />
          <div tw="pb-10 px-5">
            <DanjiRecommendationForm.Interview
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
