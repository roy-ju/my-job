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

export default function DanjiRecommendationForm({
  forms,
  nextButtonDisabled,
  onClickNext,
  danji,
  danjiID,
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
  onChangePyoungList,
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

  onClickBack,
  onClickOpenDanjiList,

  danjiRealPricesPyoungList,
  onClickPyoungDeleteIcon,
  onClickPyoungAddIcon,
  onClickPyoungButton,
  onClickPyoungCloseButton,
  emptyTextFields,
  isEntryDanji,
}: Props) {
  const context = useMemo(
    () => ({
      forms,
      nextButtonDisabled,
      onClickNext,
      danji,
      danjiID,
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
      onChangePyoungList,
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
      onClickOpenDanjiList,

      danjiRealPricesPyoungList,
      onClickPyoungDeleteIcon,
      onClickPyoungAddIcon,
      onClickPyoungButton,
      onClickPyoungCloseButton,

      emptyTextFields,
      isEntryDanji,
    }),
    [
      forms,
      nextButtonDisabled,
      onClickNext,
      danji,
      danjiID,
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
      onChangePyoungList,
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
      onClickOpenDanjiList,

      danjiRealPricesPyoungList,
      onClickPyoungDeleteIcon,
      onClickPyoungAddIcon,
      onClickPyoungButton,
      onClickPyoungCloseButton,

      emptyTextFields,
      isEntryDanji,
    ],
  );

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물 구해요</NavigationHeader.Title>
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
      {!(forms?.length === 1 && forms?.[0] === 'danji' && !(typeof danjiID === 'number')) && (
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
