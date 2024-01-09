import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { mutate as otherMutate } from 'swr';

import { toast } from 'react-toastify';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import { apiService } from '@/services';

import useFetchMyDashboardInfo from '@/services/my/useFetchMyDashboardInfo';

import { BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import Routes from '@/router/routes';

import { useAuth } from '@/hooks/services';

import useCreateParams from './useCreateParams';

import SuggestFormState from '../atoms/SuggestFormState';

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

  const { user } = useAuth();

  const { mutate: dashBoardInfoMutate } = useFetchMyDashboardInfo();

  const { createParams } = useCreateParams();

  const [state, setState] = useRecoilState(SuggestFormState);

  const currentForm = useMemo(() => state.forms[state.forms.length - 1], [state.forms]);

  const isRenderRevisionText = useMemo(() => Boolean(state.forms?.length > 1), [state.forms?.length]);

  const isRenderSummitButton = useMemo(() => currentForm === 'summary', [currentForm]);

  const handleClickBack = useCallback(() => {
    setState((prev) => ({ ...prev, forms: prev.forms.filter((ele) => ele !== 'summary') }));
  }, [setState]);

  const disabled = useMemo(() => {
    if (isEqualValue(currentForm, forms.REGION_OR_DANJI)) {
      return getVaildRegionOrDanji(state.danjiOrRegion);
    }

    if (isEqualValue(currentForm, forms.REALESTATE_AND_BUYORRENT_AND_PRICE)) {
      if (state.errorMessageTradeOrDepositPrice || state.errorMessageMonthlyRentFeePrice) {
        return true;
      }

      return getValidRealestateTypeAndBuyOrRentAndPrice(
        state.danjiOrRegion,
        state.buyOrRent,
        state.tradeOrDepositPrice,
        state.realestateTypes,
        state.quickSale,
      );
    }

    if (isEqualValue(currentForm, forms.BUY_PURPOSE)) {
      if (state.errorMessageInvestAmountPrice) {
        return true;
      }

      return getValidBuyPurpose(state.purpose, state.investAmount, state.moveInDate, state.moveInDateType);
    }

    if (isEqualValue(currentForm, forms.MOVE_IN_DATE)) {
      return getValidMoveInDate(state.moveInDate, state.moveInDateType);
    }

    if (isEqualValue(currentForm, forms.AREA)) {
      return getValidArrayField(state.pyoungList);
    }

    if (isEqualValue(currentForm, forms.ADDITIONAL_CONDITIONS)) {
      return getValidArrayField(state.additionalCondtions);
    }

    if (isEqualValue(currentForm, forms.INTERVIEW)) {
      return getValidArrayField(state.interviewAvailabletimes);
    }

    return false;
  }, [
    currentForm,
    state.additionalCondtions,
    state.buyOrRent,
    state.danjiOrRegion,
    state.errorMessageInvestAmountPrice,
    state.errorMessageMonthlyRentFeePrice,
    state.errorMessageTradeOrDepositPrice,
    state.interviewAvailabletimes,
    state.investAmount,
    state.moveInDate,
    state.moveInDateType,
    state.purpose,
    state.pyoungList,
    state.quickSale,
    state.realestateTypes,
    state.tradeOrDepositPrice,
  ]);

  const handleSubmitRealestateAndBuyOrRentAndPrice = useCallback(() => {
    if (isEqualValue(state.buyOrRent, BuyOrRent.Buy)) {
      setState((prev) => ({ ...prev, forms: [...prev.forms, forms.BUY_PURPOSE] }));
    }

    if (isEqualValue(state.buyOrRent, BuyOrRent.Jeonsae)) {
      setState((prev) => ({ ...prev, forms: [...prev.forms, forms.MOVE_IN_DATE] }));
    }
  }, [setState, state.buyOrRent]);

  /** 매매 STEP TWO */
  const handleSubmitBuyPurpose = useCallback(() => {
    setState((prev) => ({ ...prev, forms: [...prev.forms, forms.AREA] }));
  }, [setState]);

  /** 전월세 STEP TWO */
  const handleSubmitMoveInDate = useCallback(() => {
    setState((prev) => ({ ...prev, forms: [...prev.forms, forms.AREA] }));
  }, [setState]);

  /** STEP THREE */
  const handleSubmitArea = useCallback(() => {
    setState((prev) => ({
      ...prev,
      forms: [...prev.forms, forms.ADDITIONAL_CONDITIONS],
      pyoungInput: '',
      errorMessagePyoungInput: '',
    }));
  }, [setState]);

  /** STEP FOUR */
  const handleSubmitAdditionalConditions = useCallback(() => {
    setState((prev) => ({
      ...prev,
      forms: [...prev.forms, forms.INTERVIEW],
      pyoungInput: '',
      errorMessagePyoungInput: '',
    }));
  }, [setState]);

  /** STEP FIVE */
  const handleSubmitInterview = useCallback(() => {
    if (!state.realestateTypes || (state.realestateTypes && isEqualValue(state.realestateTypes.length, 0))) {
      errorHandlingWithElement({
        elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
        errorMessage: ERROR_MESSAGE.REQUIRE_REALESTATE_TYPES,
      });

      return;
    }

    if (!state.buyOrRent) {
      errorHandlingWithElement({
        elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
        errorMessage: ERROR_MESSAGE.REQUIRE_BUY_OR_RENT,
      });

      return;
    }

    if (isNotEqualValue(state.quickSale, '1')) {
      if (state.errorMessageTradeOrDepositPrice) {
        errorHandlingWithElement({
          elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
          errorMessage: state.errorMessageTradeOrDepositPrice,
        });

        return;
      }

      if (state.errorMessageMonthlyRentFeePrice) {
        errorHandlingWithElement({
          elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
          errorMessage: state.errorMessageMonthlyRentFeePrice,
        });

        return;
      }
    }

    if (
      isEqualValue(state.buyOrRent, BuyOrRent.Buy) &&
      isEqualValue(state.purpose, '투자') &&
      state.errorMessageInvestAmountPrice
    ) {
      errorHandlingWithElement({
        elementID: forms.BUY_PURPOSE,
        errorMessage: state.errorMessageInvestAmountPrice,
      });

      return;
    }

    if (
      isEqualValue(state.buyOrRent, BuyOrRent.Buy) &&
      isEqualValue(state.purpose, '실거주') &&
      (!state.moveInDate || !state.moveInDateType)
    ) {
      errorHandlingWithElement({
        elementID: forms.BUY_PURPOSE,
        errorMessage: ERROR_MESSAGE.REQUIRE_MOVE_IN_DATE,
      });

      return;
    }

    if (isNotEqualValue(state.buyOrRent, BuyOrRent.Buy) && (!state.moveInDate || !state.moveInDateType)) {
      errorHandlingWithElement({
        elementID: forms.MOVE_IN_DATE,
        errorMessage: ERROR_MESSAGE.REQUIRE_MOVE_IN_DATE,
      });

      return;
    }

    if (!state.pyoungList || (state.pyoungList && isEqualValue(state.pyoungList.length, 0))) {
      errorHandlingWithElement({
        elementID: forms.AREA,
        errorMessage: ERROR_MESSAGE.REQUIRE_AREA,
      });

      return;
    }

    if (
      !state.additionalCondtions ||
      (state.additionalCondtions && isEqualValue(state.additionalCondtions.length, 0))
    ) {
      errorHandlingWithElement({
        elementID: forms.ADDITIONAL_CONDITIONS,
        errorMessage: ERROR_MESSAGE.REQUIRE_ADDITIONAL_CONDITIONS,
      });
      return;
    }

    if (
      !state.interviewAvailabletimes ||
      (state.interviewAvailabletimes && isEqualValue(state.interviewAvailabletimes.length, 0))
    ) {
      errorHandlingWithElement({
        elementID: forms.INTERVIEW,
        errorMessage: ERROR_MESSAGE.REQUIRE_INTERVIEW,
      });
    }

    const params = createParams();

    if (!user) {
      if (platform === 'pc') {
        customRouter.replaceCurrent(Routes.Login, {
          persistParams: true,
          searchParams: {
            redirect: `${router.asPath}`,
            ...(router?.query?.entry ? { entry: router.query.entry as string } : {}),
            ...(router?.query?.danjiID ? { depth2: router.query.danjiID as string } : {}),
            params: JSON.stringify(params),
            forms: JSON.stringify([...state.forms, forms.SUMMARY]),
          },
        });
      } else {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
          query: {
            redirect: `${router.asPath}`,
            ...(router?.query?.entry ? { entry: router.query.entry as string } : {}),
            ...(router?.query?.danjiID ? { depth2: router.query.danjiID as string } : {}),
            params: JSON.stringify(params),
            forms: JSON.stringify([...state.forms, forms.SUMMARY]),
          },
        });
      }
      return;
    }

    if (user && !user?.isVerified) {
      if (platform === 'pc') {
        customRouter.replaceCurrent(Routes.VerifyCi, {
          persistParams: true,
          searchParams: {
            redirect: `${router.asPath}`,
            ...(router?.query?.entry ? { entry: router.query.entry as string } : {}),
            ...(router?.query?.danjiID ? { depth2: router.query.danjiID as string } : {}),
            forms: JSON.stringify([...state.forms, forms.SUMMARY]),
            params: JSON.stringify(params),
          },
        });
      } else {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
          query: {
            redirect: `${router.asPath}`,
            ...(router?.query?.entry ? { entry: router.query.entry as string } : {}),
            ...(router?.query?.danjiID ? { depth2: router.query.danjiID as string } : {}),
            forms: JSON.stringify([...state.forms, forms.SUMMARY]),
            params: JSON.stringify(params),
          },
        });
      }
      return;
    }

    setState((prev) => ({
      ...prev,
      forms: [...prev.forms, forms.SUMMARY],
      pyoungInput: '',
      errorMessageTradeOrDepositPrice: '',
      errorMessageMonthlyRentFeePrice: '',
      errorMessageInvestAmountPrice: '',
      errorMessagePyoungInput: '',
    }));

    customRouter.replace(
      Routes.RecommendationForm,
      {
        searchParams: {
          ...(router?.query?.entry ? { entry: router.query.entry as string } : {}),
          ...(router?.query?.danjiID ? { depth2: router.query.danjiID as string } : {}),
          forms: JSON.stringify([...state.forms, forms.SUMMARY]),
          params: JSON.stringify(params),
        },
      },
      true,
    );
  }, [
    state.realestateTypes,
    state.buyOrRent,
    state.quickSale,
    state.purpose,
    state.errorMessageInvestAmountPrice,
    state.moveInDate,
    state.moveInDateType,
    state.pyoungList,
    state.additionalCondtions,
    state.interviewAvailabletimes,
    state.errorMessageTradeOrDepositPrice,
    state.errorMessageMonthlyRentFeePrice,
    state.forms,
    createParams,
    user,
    setState,
    platform,
    customRouter,
    router,
  ]);

  const handleSubmitSummary = useCallback(async () => {
    if (!state.danjiOrRegion) return;

    const params = createParams();

    if (isEqualValue(state.danjiOrRegion, DanjiOrRegionalType.Danji)) {
      try {
        if (params) {
          delete params.danjiAddress;
          delete params.danjiRealestateType;
        }

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

    if (isEqualValue(state.danjiOrRegion, DanjiOrRegionalType.Regional)) {
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
  }, [createParams, dashBoardInfoMutate, platform, router, state.danjiOrRegion]);

  const handleFormsAction = useCallback(() => {
    const lastForm = state.forms[state.forms.length - 1];

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
    state.forms,
    handleSubmitRealestateAndBuyOrRentAndPrice,
    handleSubmitBuyPurpose,
    handleSubmitMoveInDate,
    handleSubmitArea,
    handleSubmitAdditionalConditions,
    handleSubmitInterview,
    handleSubmitSummary,
  ]);

  return {
    isRenderSummitButton,
    isRenderRevisionText,
    hidden: currentForm === 'region_or_danji',
    disabled,
    handleFormsAction,
    handleClickBack: isRenderSummitButton ? handleClickBack : undefined,
  };
}
