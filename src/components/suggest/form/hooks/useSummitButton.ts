import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { BuyOrRent } from '@/constants/enums';

import isEqualValue from '../../utils/isEqualValue';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import forms from '../constants/forms';

import getValidArrayField from '../../utils/getValidArrayField';

import getValidBuyPurpose from '../../utils/getValidBuyPurpose';

import getValidMoveInDate from '../../utils/getValidMoveInDate';

import getValidRealestateTypeAndBuyOrRentAndPrice from '../../utils/getValidRealestateTypeAndBuyOrRentAndPrice';

export default function useSummitButton() {
  const [form, setForm] = useRecoilState<SuggestForm['forms']>(SuggestFormSelector('forms'));

  const danjiOrRegion = useRecoilValue<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));
  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));
  const tradeOrDepositPrice = useRecoilValue<SuggestForm['tradeOrDepositPrice']>(
    SuggestFormSelector('tradeOrDepositPrice'),
  );
  const realestateTypes = useRecoilValue<SuggestForm['realestateTypes']>(SuggestFormSelector('realestateTypes'));
  const quickSale = useRecoilValue<SuggestForm['quickSale']>(SuggestFormSelector('quickSale'));

  const purpose = useRecoilValue<SuggestForm['purpose']>(SuggestFormSelector('purpose'));
  const investAmount = useRecoilValue<SuggestForm['investAmount']>(SuggestFormSelector('investAmount'));
  const moveInDate = useRecoilValue<SuggestForm['moveInDate']>(SuggestFormSelector('moveInDate'));
  const moveInDateType = useRecoilValue<SuggestForm['moveInDateType']>(SuggestFormSelector('moveInDateType'));

  const pyoungList = useRecoilValue<SuggestForm['pyoungList']>(SuggestFormSelector('pyoungList'));

  const additionalCondtions = useRecoilValue<SuggestForm['additionalCondtions']>(
    SuggestFormSelector('additionalCondtions'),
  );

  const interviewAvailabletimes = useRecoilValue<SuggestForm['interviewAvailabletimes']>(
    SuggestFormSelector('interviewAvailabletimes'),
  );

  const errorMessageTradeOrDepositPrice = useRecoilValue<SuggestForm['errorMessageTradeOrDepositPrice']>(
    SuggestFormSelector('errorMessageTradeOrDepositPrice'),
  );

  const errorMessageMonthlyRentFeePrice = useRecoilValue<SuggestForm['errorMessageMonthlyRentFeePrice']>(
    SuggestFormSelector('errorMessageMonthlyRentFeePrice'),
  );

  const errorMessageInvestAmountPrice = useRecoilValue<SuggestForm['errorMessageInvestAmountPrice']>(
    SuggestFormSelector('errorMessageInvestAmountPrice'),
  );

  const isRenderRevisionText = useMemo(() => Boolean(form?.length > 1), [form?.length]);

  const disabled = useMemo(() => {
    const currentForm = form[form.length - 1];

    if (isEqualValue(currentForm, forms.REALESTATE_AND_BUYORRENT_AND_PRICE)) {
      return getValidRealestateTypeAndBuyOrRentAndPrice(
        danjiOrRegion,
        buyOrRent,
        tradeOrDepositPrice,
        realestateTypes,
        quickSale,
      );
    }

    if (isEqualValue(currentForm, forms.BUY_PURPOSE)) {
      return getValidBuyPurpose(purpose, investAmount, moveInDate, moveInDateType);
    }

    if (isEqualValue(currentForm, forms.MOVE_IN_DATE)) {
      return getValidMoveInDate(moveInDate, moveInDateType);
    }

    if (isEqualValue(currentForm, forms.AREA)) {
      return getValidArrayField(pyoungList);
    }

    if (isEqualValue(currentForm, forms.ADDITIONAL_CONDITIONS)) {
      return getValidArrayField(additionalCondtions);
    }

    if (isEqualValue(currentForm, forms.INTERVIEW)) {
      return getValidArrayField(interviewAvailabletimes);
    }

    if (isEqualValue(currentForm, forms.SUMMARY)) {
      return true;
    }

    return false;
  }, [
    additionalCondtions,
    buyOrRent,
    danjiOrRegion,
    form,
    interviewAvailabletimes,
    investAmount,
    moveInDate,
    moveInDateType,
    purpose,
    pyoungList,
    quickSale,
    realestateTypes,
    tradeOrDepositPrice,
  ]);

  const handleSubmitRealestateAndBuyOrRentAndPrice = useCallback(() => {
    if (isEqualValue(buyOrRent, BuyOrRent.Buy)) {
      setForm((prev) => [...prev, forms.BUY_PURPOSE]);
    }

    if (isEqualValue(buyOrRent, BuyOrRent.Jeonsae)) {
      setForm((prev) => [...prev, forms.MOVE_IN_DATE]);
    }
  }, [buyOrRent, setForm]);

  /** 매매 STEP TWO */
  const handleSubmitBuyPurpose = useCallback(() => {
    setForm((prev) => [...prev, forms.AREA]);
  }, [setForm]);

  /** 전월세 STEP TWO */
  const handleSubmitMoveInDate = useCallback(() => {
    setForm((prev) => [...prev, forms.AREA]);
  }, [setForm]);

  /** STEP THREE */
  const handleSubmitArea = useCallback(() => {
    setForm((prev) => [...prev, forms.ADDITIONAL_CONDITIONS]);
  }, [setForm]);

  /** STEP FOUR */
  const handleSubmitAdditionalConditions = useCallback(() => {
    setForm((prev) => [...prev, forms.INTERVIEW]);
  }, [setForm]);

  /** STEP FIVE */
  const handleSubmitInterview = useCallback(() => {
    setForm((prev) => [...prev, forms.SUMMARY]);
  }, [setForm]);

  const handleSubmitSummary = useCallback(() => {}, []);

  const handleFormsAction = useCallback(() => {
    const lastForm = form[form.length - 1];

    switch (lastForm) {
      case forms.REALESTATE_AND_BUYORRENT_AND_PRICE:
        handleSubmitRealestateAndBuyOrRentAndPrice();
        break;

      case forms.BUY_PURPOSE:
        handleSubmitBuyPurpose();
        break;

      case forms.MOVE_IN_DATE:
        handleSubmitMoveInDate();
        break;

      case forms.AREA:
        handleSubmitArea();
        break;

      case forms.ADDITIONAL_CONDITIONS:
        handleSubmitAdditionalConditions();
        break;

      case forms.INTERVIEW:
        handleSubmitInterview();
        break;

      case forms.SUMMARY:
        handleSubmitSummary();
        break;

      default:
        break;
    }
  }, [
    form,
    handleSubmitAdditionalConditions,
    handleSubmitArea,
    handleSubmitBuyPurpose,
    handleSubmitInterview,
    handleSubmitMoveInDate,
    handleSubmitRealestateAndBuyOrRentAndPrice,
    handleSubmitSummary,
  ]);

  return {
    isRenderRevisionText,
    disabled,
    handleFormsAction,
  };
}
