import { NavigationHeader } from '@/components/molecules';
import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { useMemo } from 'react';
import FormRenderer from './FormRenderer';
import FormContext, { IFormContext } from './FormContext';

interface Props extends IFormContext {
  forms?: string[];
  nextButtonDisabled?: boolean;
  onClickNext?: () => void;
  onClickBack?: () => void;
}

export default function SuggestRegionalForm({
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
      <PersistentBottomBar>
        <Button disabled={nextButtonDisabled} tw="w-full" size="bigger" onClick={onClickNext}>
          다음
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
