/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { mutate as otherMutate } from 'swr';

import { toast } from 'react-toastify';

import { apiService } from '@/services';

import useFetchMyDashboardInfo from '@/services/my/useFetchMyDashboardInfo';

import { BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import Routes from '@/router/routes';

import useCreateParams from './useCreateParams';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import forms from '../constants/forms';

import ERROR_MESSAGE from '../constants/errorMessage';

import isEqualValue from '../../utils/isEqualValue';

import isNotEqualValue from '../../utils/isNotEqualValue';

import errorHandlingWithElement from '../../utils/errorHandlingWidthElement';

import getValidArrayField from '../../utils/getValidArrayField';

import getVaildRegionOrDanji from '../../utils/getVaildRegionOrDanji';

import getValidBuyPurpose from '../../utils/getValidBuyPurpose';

import getValidMoveInDate from '../../utils/getValidMoveInDate';

import getValidRealestateTypeAndBuyOrRentAndPrice from '../../utils/getValidRealestateTypeAndBuyOrRentAndPrice';

export default function useSummitButton({ depth }: { depth?: number }) {
  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { mutate: dashBoardInfoMutate } = useFetchMyDashboardInfo();

  const { createParams } = useCreateParams();

  const [form, setForm] = useRecoilState<SuggestForm['forms']>(SuggestFormSelector('forms'));

  const [errorMessageTradeOrDepositPrice, setErrorMessageTradeOrDepositPrice] = useRecoilState<
    SuggestForm['errorMessageTradeOrDepositPrice']
  >(SuggestFormSelector('errorMessageTradeOrDepositPrice'));

  const [errorMessageMonthlyRentFeePrice, setErrorMessageMonthlyRentFeePrice] = useRecoilState<
    SuggestForm['errorMessageMonthlyRentFeePrice']
  >(SuggestFormSelector('errorMessageMonthlyRentFeePrice'));

  const [errorMessageInvestAmountPrice, setErrorMessageInvestAmountPrice] = useRecoilState<
    SuggestForm['errorMessageInvestAmountPrice']
  >(SuggestFormSelector('errorMessageInvestAmountPrice'));

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

  const setErrorMessagePyoungInput = useSetRecoilState<SuggestForm['errorMessagePyoungInput']>(
    SuggestFormSelector('errorMessagePyoungInput'),
  );

  const currentForm = useMemo(() => form[form.length - 1], [form]);

  const isRenderRevisionText = useMemo(() => Boolean(form?.length > 1), [form?.length]);

  const isRenderSummitButton = useMemo(() => currentForm === 'summary', [currentForm]);

  const handleClickBack = useCallback(() => {
    setForm((prev) => prev.filter((ele) => ele !== 'summary'));
  }, [setForm]);

  const disabled = useMemo(() => {
    if (isEqualValue(currentForm, forms.REGION_OR_DANJI)) {
      return getVaildRegionOrDanji(danjiOrRegion);
    }

    if (isEqualValue(currentForm, forms.REALESTATE_AND_BUYORRENT_AND_PRICE)) {
      if (errorMessageTradeOrDepositPrice || errorMessageMonthlyRentFeePrice) {
        return true;
      }

      return getValidRealestateTypeAndBuyOrRentAndPrice(
        danjiOrRegion,
        buyOrRent,
        tradeOrDepositPrice,
        realestateTypes,
        quickSale,
      );
    }

    if (isEqualValue(currentForm, forms.BUY_PURPOSE)) {
      if (errorMessageInvestAmountPrice) {
        return true;
      }

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

    return false;
  }, [
    currentForm,
    additionalCondtions,
    buyOrRent,
    danjiOrRegion,
    errorMessageInvestAmountPrice,
    errorMessageMonthlyRentFeePrice,
    errorMessageTradeOrDepositPrice,
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
    if (!realestateTypes || (realestateTypes && isEqualValue(realestateTypes.length, 0))) {
      errorHandlingWithElement({
        elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
        errorMessage: ERROR_MESSAGE.REQUIRE_REALESTATE_TYPES,
      });

      return;
    }

    if (!buyOrRent) {
      errorHandlingWithElement({
        elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
        errorMessage: ERROR_MESSAGE.REQUIRE_BUY_OR_RENT,
      });

      return;
    }

    if (isNotEqualValue(quickSale, '1')) {
      if (errorMessageTradeOrDepositPrice) {
        errorHandlingWithElement({
          elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
          errorMessage: errorMessageTradeOrDepositPrice,
        });

        return;
      }

      if (errorMessageMonthlyRentFeePrice) {
        errorHandlingWithElement({
          elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
          errorMessage: errorMessageMonthlyRentFeePrice,
        });

        return;
      }
    }

    if (isEqualValue(buyOrRent, BuyOrRent.Buy) && isEqualValue(purpose, '투자') && errorMessageInvestAmountPrice) {
      errorHandlingWithElement({
        elementID: forms.BUY_PURPOSE,
        errorMessage: errorMessageInvestAmountPrice,
      });

      return;
    }

    if (isEqualValue(buyOrRent, BuyOrRent.Buy) && isEqualValue(purpose, '실거주') && (!moveInDate || !moveInDateType)) {
      errorHandlingWithElement({
        elementID: forms.BUY_PURPOSE,
        errorMessage: ERROR_MESSAGE.REQUIRE_MOVE_IN_DATE,
      });

      return;
    }

    if (isNotEqualValue(buyOrRent, BuyOrRent.Buy) && (!moveInDate || !moveInDateType)) {
      errorHandlingWithElement({
        elementID: forms.MOVE_IN_DATE,
        errorMessage: ERROR_MESSAGE.REQUIRE_MOVE_IN_DATE,
      });

      return;
    }

    if (!pyoungList || (pyoungList && isEqualValue(pyoungList.length, 0))) {
      errorHandlingWithElement({
        elementID: forms.AREA,
        errorMessage: ERROR_MESSAGE.REQUIRE_AREA,
      });

      return;
    }

    if (!additionalCondtions || (additionalCondtions && isEqualValue(additionalCondtions.length, 0))) {
      errorHandlingWithElement({
        elementID: forms.ADDITIONAL_CONDITIONS,
        errorMessage: ERROR_MESSAGE.REQUIRE_ADDITIONAL_CONDITIONS,
      });
      return;
    }

    if (!interviewAvailabletimes || (interviewAvailabletimes && isEqualValue(interviewAvailabletimes.length, 0))) {
      errorHandlingWithElement({
        elementID: forms.INTERVIEW,
        errorMessage: ERROR_MESSAGE.REQUIRE_INTERVIEW,
      });
    }

    setForm((prev) => [...prev, forms.SUMMARY]);
    setErrorMessageTradeOrDepositPrice('');
    setErrorMessageMonthlyRentFeePrice('');
    setErrorMessageInvestAmountPrice('');
    setErrorMessagePyoungInput('');
  }, [
    additionalCondtions,
    buyOrRent,
    errorMessageInvestAmountPrice,
    errorMessageMonthlyRentFeePrice,
    errorMessageTradeOrDepositPrice,
    interviewAvailabletimes,
    moveInDate,
    moveInDateType,
    purpose,
    pyoungList,
    quickSale,
    realestateTypes,
    setErrorMessageInvestAmountPrice,
    setErrorMessageMonthlyRentFeePrice,
    setErrorMessagePyoungInput,
    setErrorMessageTradeOrDepositPrice,
    setForm,
  ]);

  const handleSubmitSummary = useCallback(async () => {
    if (!danjiOrRegion) return;

    const params = createParams();

    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      try {
        await apiService.createSuggestDanji(params);

        await dashBoardInfoMutate();

        await otherMutate(() => true, undefined);

        toast.success('구해요 글이 등록되었습니다.');

        if (platform === 'pc') {
          router.replace(`/${Routes.DanjiDetail}?danjiID=${params?.danji_id}`);
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${params?.danji_id}`);
        }
      } catch (error) {
        console.log(error);

        toast.error('등록 중 오류가 발생했습니다.');
      }
    }

    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Regional)) {
      try {
        await apiService.createSuggestRegional(params);

        await dashBoardInfoMutate();

        toast.success('구해요 글이 등록되었습니다.');

        if (platform === 'pc') {
          router.replace(`/${Routes.My}/${Routes.SuggestRequestedList}?default=1`);
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}?default=1`);
        }
      } catch (error) {
        console.log(error);

        toast.error('등록 중 오류가 발생했습니다.');
      }
    }
  }, [createParams, danjiOrRegion, dashBoardInfoMutate, platform, router]);

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
    isRenderSummitButton,
    isRenderRevisionText,
    disabled,
    handleFormsAction,
    handleClickBack: isRenderSummitButton ? handleClickBack : undefined,
  };
}
