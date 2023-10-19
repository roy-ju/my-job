import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { SuggestRegionalForm } from '@/components/organisms';
import { BuyOrRent } from '@/constants/enums';
import { IFormContext } from '../SuggestRegionalForm/FormContext';

interface Props extends Omit<IFormContext, 'buyOrRent'> {
  targetText?: string;
  buyOrRentText?: string;
  buyOrRent?: string;
  onClickBack?: () => void;
  nextButtonDisabled?: boolean;
  onSubmitFinal?: () => void;
}

export default function SuggestRegionalFormUpdate({
  nextButtonDisabled,

  targetText,
  buyOrRentText,
  onClickBack,

  realestateType,
  buyOrRent,
  onChangeRealestateType,
  price,
  onChangePrice,
  investAmount,
  onChangeInvestAmount,
  monthlyRentFee,
  onChangeMonthlyRentFee,
  negotiable,
  onChangeNegotiable,
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

  interviewAvailabletimes,
  onChangeInterviewAvailabletimes,

  emptyTextFields,

  onSubmitFinal,
}: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>구해요 수정</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="py-7 px-5">
          <div tw="font-bold text-b1 mb-1">{`구하는 지역: ${targetText}`}</div>
          <div tw="font-bold text-b1 mb-1">{`구하는 거래 종류: ${buyOrRentText}`}</div>
        </div>
        <Separator tw="bg-gray-300" />
        <div tw="pt-10 pb-7 px-5">
          <SuggestRegionalForm.RealestateType value={realestateType} onChange={onChangeRealestateType} />
        </div>
        <Separator tw="bg-gray-300" />
        <div tw="py-10 px-5">
          <SuggestRegionalForm.Price
            update
            buyOrRent={Number(buyOrRent) || BuyOrRent.Jeonsae}
            price={price}
            onChangePrice={onChangePrice}
            monthlyRentFee={monthlyRentFee}
            onChangeMonthlyRentFee={onChangeMonthlyRentFee}
            negotiable={negotiable}
            onChangeNegotiable={onChangeNegotiable}
          />
        </div>
        <Separator tw="bg-gray-300" />
        {Number(buyOrRent) === BuyOrRent.Buy && (
          <div tw="py-10">
            <div tw="px-5">
              <SuggestRegionalForm.Purpose value={purpose} onChange={onChangePurpose} />
            </div>
            <div tw="mt-7 px-5">
              {purpose === '실거주' ? (
                <SuggestRegionalForm.MoveInDate
                  moveInDate={moveInDate}
                  onChangeMoveInDate={onChangeMoveInDate}
                  moveInDateType={moveInDateType}
                  onChangeMoveInDateType={onChangeMoveInDateType}
                />
              ) : (
                <SuggestRegionalForm.InvestAmount
                  investAmount={investAmount}
                  onChangeInvestAmount={onChangeInvestAmount}
                  hasError={emptyTextFields?.investAmount}
                />
              )}
            </div>
          </div>
        )}
        {Number(buyOrRent) !== BuyOrRent.Buy && (
          <div tw="py-10 px-5">
            <SuggestRegionalForm.MoveInDate
              moveInDate={moveInDate}
              onChangeMoveInDate={onChangeMoveInDate}
              moveInDateType={moveInDateType}
              onChangeMoveInDateType={onChangeMoveInDateType}
            />
          </div>
        )}
        <Separator tw="bg-gray-300" />
        <div>
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
              buyOrRent={Number(buyOrRent) || BuyOrRent.Jeonsae}
            />
          </div>
          <div tw="px-5 pb-10">
            <SuggestRegionalForm.Interview
              interviewAvailabletimes={interviewAvailabletimes}
              onChangeInterviewAvailabletimes={onChangeInterviewAvailabletimes}
            />
          </div>
        </div>
      </div>
      <PersistentBottomBar>
        <Button tw="w-full" size="bigger" onClick={onSubmitFinal} disabled={nextButtonDisabled}>
          수정 완료
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
