import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { mutate as otherMutate } from 'swr';

import { toast } from 'react-toastify';

import { apiService } from '@/services';

import useFetchMyDashboardInfo from '@/services/my/useFetchMyDashboardInfo';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuth from '@/hooks/services/useAuth';

import getPath from '@/utils/getPath';

import { BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import Routes from '@/router/routes';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

import Actions from '@/constants/actions';

import SuggestFormState from '../atoms/SuggestFormState';

import forms from '../constants/forms';

import isEqualValue from '../../utils/isEqualValue';

import getValidArrayField from '../../utils/getValidArrayField';

import getVaildRegionOrDanji from '../../utils/getVaildRegionOrDanji';

import getValidBuyPurpose from '../../utils/getValidBuyPurpose';

import getValidMoveInDate from '../../utils/getValidMoveInDate';

import getValidRealestateTypeAndBuyOrRentAndPrice from '../../utils/getValidRealestateTypeAndBuyOrRentAndPrice';

import createSubmitParams from '../../utils/createSubmitParams';

import checkFinalValidation from '../../utils/checkFinalValidation';

export default function useFormSummitButton() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { user } = useAuth();

  const { mutate: dashBoardInfoMutate } = useFetchMyDashboardInfo();

  const [state, setState] = useRecoilState(SuggestFormState);

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const currentForm = useMemo(() => state.forms[state.forms.length - 1], [state.forms]);

  const isRenderRevisionText = useMemo(() => Boolean(state.forms?.length > 1), [state.forms?.length]);

  const isRenderSummitButton = useMemo(() => currentForm === 'summary', [currentForm]);

  const handleClickBack = useCallback(() => {
    setState((prev) => ({ ...prev, forms: prev.forms.filter((ele) => ele !== 'summary') }));
  }, [setState]);

  const gtagButtonId = useMemo(() => {
    if (currentForm === 'realestate_and_buyOrRent_and_price') {
      return GOOGLE_TAG_BUTTON_ID.SUGGEST_FORM_REALESTATE_BOR_PRICE;
    }

    if (currentForm === 'buy_purpose') {
      return GOOGLE_TAG_BUTTON_ID.SUGGEST_FORM_BUY_PURPOSE;
    }

    if (currentForm === 'move_in_date') {
      return GOOGLE_TAG_BUTTON_ID.SUGGEST_FORM_MOVE_IN_DATE;
    }

    if (currentForm === 'area') {
      return GOOGLE_TAG_BUTTON_ID.SUGGEST_FORM_AREA;
    }

    if (currentForm === 'additional_conditions') {
      return GOOGLE_TAG_BUTTON_ID.SUGGEST_FORM_ADDITIONAL_CONDITIONS;
    }

    if (currentForm === 'interview') {
      return GOOGLE_TAG_BUTTON_ID.SUGGEST_FORM_INTERVIEW;
    }

    return '';
  }, [currentForm]);

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
      return getValidArrayField(state.additionalConditions);
    }

    if (isEqualValue(currentForm, forms.INTERVIEW)) {
      return getValidArrayField(state.interviewAvailabletimes);
    }

    return false;
  }, [
    currentForm,
    state.additionalConditions,
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
    if (!checkFinalValidation(state)) return;

    const params = createSubmitParams(state);

    setState((prev) => ({
      ...prev,
      forms: [...prev.forms, forms.SUMMARY],
      pyoungInput: '',
      errorMessageTradeOrDepositPrice: '',
      errorMessageMonthlyRentFeePrice: '',
      errorMessageInvestAmountPrice: '',
      errorMessagePyoungInput: '',
    }));

    if (platform === 'pc') {
      const path = getPath({
        depth1: router?.query?.depth1 as NegocioPath,
        depth2: router?.query?.depth2 as NegocioPath,
        targetPath: Routes.SuggestForm as NegocioPath,
      });
      router.push(
        {
          pathname: path,
          query: {
            ...(router?.query?.entry ? { entry: `${router.query.entry}` } : {}),
            ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
            ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
            forms: JSON.stringify([...state.forms, forms.SUMMARY]),
            params: JSON.stringify(params),
          },
        },
        undefined,
        { shallow: true },
      );
    } else {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
          query: {
            ...(router?.query?.entry ? { entry: `${router.query.entry}` } : {}),
            ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
            ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
            forms: JSON.stringify([...state.forms, forms.SUMMARY]),
            params: JSON.stringify(params),
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [state, setState, platform, router]);

  const createSuggest = useCallback(async () => {
    const params = createSubmitParams(state);

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(Actions.Suggest_Create_Form.key, '1');
    }

    if (isEqualValue(state.danjiOrRegion, DanjiOrRegionalType.Danji)) {
      try {
        if (params) {
          delete params.danjiAddress;
          delete params.danjiRealestateType;
          params.pyoungs = (params.pyoungs as string[]).join(',');
        }

        await apiService.createSuggestDanji(params);

        await dashBoardInfoMutate();

        if (platform === 'pc') {
          await otherMutate(() => true, undefined);
        }

        if (platform === 'pc') {
          const depth1 = router?.query?.depth1;
          const depth2 = router?.query?.depth2;

          if (depth1 && !depth2) {
            router.replace({
              pathname: `/${Routes.WaitingCreateForm}`,
            });
          } else if (depth1 && depth2) {
            router.replace({
              pathname: `/${depth1}/${Routes.WaitingCreateForm}`,
              query: {
                ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
                ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
              },
            });
          }
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.WaitingCreateForm}`);
        }
      } catch (error) {
        toast.error('등록 중 오류가 발생했습니다.');
      }
    }

    if (isEqualValue(state.danjiOrRegion, DanjiOrRegionalType.Regional)) {
      try {
        await apiService.createSuggestRegional(params);

        await dashBoardInfoMutate();

        if (platform === 'pc') {
          const depth1 = router?.query?.depth1;
          const depth2 = router?.query?.depth2;

          if (depth1 && !depth2) {
            router.replace({
              pathname: `/${Routes.WaitingCreateForm}`,
            });
          } else if (depth1 && depth2) {
            router.replace({
              pathname: `/${depth1}/${Routes.WaitingCreateForm}`,
              query: {
                ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
                ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
              },
            });
          }
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.WaitingCreateForm}`);
        }
      } catch (error) {
        toast.error('등록 중 오류가 발생했습니다.');
      }
    }
  }, [dashBoardInfoMutate, platform, router, state]);

  const handleSubmitCreate = useCallback(async () => {
    if (!state.danjiOrRegion) return;

    if (!user) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl();
      return;
    }

    if (user && !user?.isVerified) {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1;
        const depth2 = router?.query?.depth2;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && !depth2) {
          router.push({
            pathname: `/${Routes.VerifyCi}`,
            query,
          });
        } else if (depth1 && depth2) {
          router.push({
            pathname: `/${depth1}/${Routes.VerifyCi}`,
            query,
          });
        }
        handleUpdateReturnUrl();
      } else {
        router.push({ pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`, query: router.query });
        handleUpdateReturnUrl();
      }

      return;
    }

    createSuggest();
  }, [state.danjiOrRegion, user, createSuggest, openAuthPopup, handleUpdateReturnUrl, platform, router]);

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
        handleSubmitCreate();
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
    handleSubmitCreate,
  ]);

  return {
    isRenderSummitButton,
    isRenderRevisionText,
    hidden: currentForm === forms.REGION_OR_DANJI,
    disabled,
    gtagButtonId,
    handleFormsAction,
    handleClickBack: isRenderSummitButton ? handleClickBack : undefined,
  };
}
