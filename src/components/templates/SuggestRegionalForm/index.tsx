import { NavigationHeader } from '@/components/molecules';
import { Button, Loading, PersistentBottomBar, Separator } from '@/components/atoms';
import { useMemo } from 'react';
import FormRenderer from './FormRenderer';
import FormContext, { IFormContext } from './FormContext';

interface Props extends IFormContext {
  isPrefillingBubjungdong?: boolean;
  forms?: string[];
  nextButtonDisabled?: boolean;
  onClickNext?: () => void;
  onClickBack?: () => void;
}

export default function SuggestRegionalForm({
  isPrefillingBubjungdong = false,
  forms,
  onClickNext,
  onClickOpenRegionList,
  nextButtonDisabled,

  region,

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

  onClickBack,
}: Props) {
  const context = useMemo(
    () => ({
      onClickOpenRegionList,
      region,

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
    }),
    [
      onClickOpenRegionList,
      region,

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
    ],
  );

  if (isPrefillingBubjungdong) {
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>지역 매물 추천받기</NavigationHeader.Title>
      </NavigationHeader>
      <FormContext.Provider value={context}>
        <div id="formContainer" tw="flex-1 min-h-0 overflow-auto">
          {forms?.map((form, index) => (
            <div key={form}>
              <FormRenderer form={form} />
              {forms.length !== index + 1 && <Separator />}
            </div>
          ))}
        </div>
      </FormContext.Provider>
      {!(forms?.length === 1 && forms?.[0] === 'region' && !region) && (
        <PersistentBottomBar>
          <div>
            <Button disabled={nextButtonDisabled} tw="w-full" size="bigger" onClick={onClickNext}>
              다음
            </Button>
            {forms && forms.length > 1 && (
              <p tw="text-info [line-height: 16px] [text-align: center] mt-[7px]">수정을 원하시면 위로 스크롤하세요.</p>
            )}
          </div>
        </PersistentBottomBar>
      )}
    </div>
  );
}
