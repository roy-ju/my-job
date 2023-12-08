import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { DanjiRecommendationForm } from '@/components/organisms';
import { BuyOrRent } from '@/constants/enums';
import { IFormContext } from '../DanjiRecommendation/FormContext';

interface Props extends IFormContext {
  targetText?: string;
  buyOrRentText?: string;
  nextButtonDisabled?: boolean;
  onClickBack?: () => void;
  onSubmitFinal?: () => void;
}

export default function DanjiRecommendationUpdate({
  targetText,
  buyOrRentText,
  nextButtonDisabled,
  onClickBack,
  onSubmitFinal,
  buyOrRent,
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
        <div tw="py-10 px-5">
          <DanjiRecommendationForm.Price
            update
            buyOrRent={buyOrRent}
            price={price}
            onChangePrice={onChangePrice}
            monthlyRentFee={monthlyRentFee}
            onChangeMonthlyRentFee={onChangeMonthlyRentFee}
            negotiable={negotiable}
            onChangeNegotiable={onChangeNegotiable}
            quickSale={quickSale}
            onChangeQuickSale={onChangeQuickSale}
          />
        </div>
        <Separator tw="bg-gray-300" />
        {Number(buyOrRent) === BuyOrRent.Buy && (
          <div tw="py-10">
            <div tw="px-5">
              <DanjiRecommendationForm.Purpose value={purpose} onChange={onChangePurpose} />
            </div>
            <div tw="mt-7 px-5">
              {purpose === '실거주' ? (
                <DanjiRecommendationForm.MoveInDate
                  moveInDate={moveInDate}
                  onChangeMoveInDate={onChangeMoveInDate}
                  moveInDateType={moveInDateType}
                  onChangeMoveInDateType={onChangeMoveInDateType}
                />
              ) : (
                <DanjiRecommendationForm.InvestAmount
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
            <DanjiRecommendationForm.MoveInDate
              moveInDate={moveInDate}
              onChangeMoveInDate={onChangeMoveInDate}
              moveInDateType={moveInDateType}
              onChangeMoveInDateType={onChangeMoveInDateType}
            />
          </div>
        )}
        <Separator tw="bg-gray-300" />
        <div>
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
          <div tw="px-5 pb-10">
            <DanjiRecommendationForm.Interview
              interviewAvailabletimes={interviewAvailabletimes}
              onChangeInterviewAvailabletimes={onChangeInterviewAvailabletimes}
            />
          </div>
        </div>
      </div>
      <PersistentBottomBar>
        <Button tw="w-full" size="bigger" onClick={onSubmitFinal} disabled={nextButtonDisabled}>
          확인
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
