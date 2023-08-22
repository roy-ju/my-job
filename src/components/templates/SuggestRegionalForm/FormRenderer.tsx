import { Separator } from '@/components/atoms';
import { SuggestRegionalForm } from '@/components/organisms';
import { useContext } from 'react';
import FormContext from './FormContext';

export const Forms = {
  Region: 'region',
  RealestateType: 'realestateType',
  BuyOrRent: 'buyOrRent',
  Price: 'price',
  Area: 'area',
  Floor: 'floor',
  Purpose: 'purpose',
  Description: 'description',
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

    minArea,
    onChangeMinArea,

    maxArea,
    onChangeMaxArea,

    floor,
    onChangeFloor,

    purpose,
    onChangePurpose,

    moveInDate,
    onChangeMoveInDate,

    moveInDateType,
    onChangeMoveInDateType,

    remainingAmountDate,
    onChangeRemainingAmountDate,

    remainingAmountDateType,
    onChangeRemainingAmountDateType,

    description,
    onChangeDescription,
  } = useContext(FormContext);

  switch (form) {
    case Forms.Region:
      return (
        <div id={Forms.Region}>
          <div tw="pt-7 pb-10 px-5 flex items-center font-bold [letter-spacing: -0.25px]">
            최소 10명의 중개사님에게 추천 요청이 발송됩니다.
            <br />
            간편하게 매물 추천 받고, 합의 여부를 선택해 보세요.
          </div>
          <Separator />
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Region region={region} onClickOpenRegionList={onClickOpenRegionList} />
          </div>
        </div>
      );

    case Forms.RealestateType:
      return (
        <div id={Forms.RealestateType}>
          <div tw="pt-10 pb-7 px-5">
            <SuggestRegionalForm.RealestateType value={realestateType} onChange={onChangeRealestateType} />
          </div>
          <div tw="pt-7 pb-10 px-5 border-t border-gray-300">
            <SuggestRegionalForm.BuyOrRent value={buyOrRent} onChange={onChangeBuyOrRent} />
          </div>
        </div>
      );

    // case Forms.BuyOrRent:
    //   return (
    //     <div id={Forms.BuyOrRent}>
    //       <div tw="py-10 px-5">
    //         <SuggestRegionalForm.BuyOrRent value={buyOrRent} onChange={onChangeBuyOrRent} />
    //       </div>
    //     </div>
    //   );

    case Forms.Price:
      return (
        <div id={Forms.Price}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Price
              buyOrRent={buyOrRent}
              price={price}
              onChangePrice={onChangePrice}
              monthlyRentFee={monthlyRentFee}
              onChangeMonthlyRentFee={onChangeMonthlyRentFee}
            />
          </div>
        </div>
      );

    case Forms.Area:
      return (
        <div id={Forms.Area}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Area
              minArea={minArea}
              onChangeMinArea={onChangeMinArea}
              maxArea={maxArea}
              onChangeMaxArea={onChangeMaxArea}
            />
          </div>
        </div>
      );

    case Forms.Floor:
      return (
        <div id={Forms.Floor}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Floor value={floor} onChange={onChangeFloor} />
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
            <div tw="pt-7 mt-7 px-5 border-t border-t-gray-300">
              {purpose === '투자' && (
                <SuggestRegionalForm.RemainingAmountDate
                  remainingAmountDate={remainingAmountDate}
                  onChangeRemainingAmountDate={onChangeRemainingAmountDate}
                  remainingAmountDateType={remainingAmountDateType}
                  onChangeRemainingAmountDateType={onChangeRemainingAmountDateType}
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

    case Forms.Description:
      return (
        <div id={Forms.Description}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Description
              description={description}
              onChangeDescription={onChangeDescription}
              buyOrRent={buyOrRent}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}
