import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { mutate as otherMutate } from 'swr';

import { toast } from 'react-toastify';

import { apiService } from '@/services';

import useFetchMyDashboardInfo from '@/services/my/useFetchMyDashboardInfo';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuth from '@/hooks/services/useAuth';

import toQueryString from '@/utils/newQueryString';

import addQueryStringToUrl from '@/utils/addQueryStringToUrl';

import getPath from '@/utils/getPath';

import { BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import Routes from '@/router/routes';

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

  const handleSubmitCreate = useCallback(async () => {
    if (!state.danjiOrRegion) return;

    const params = createSubmitParams(state);

    if (!user) {
      if (platform === 'pc') {
        router.push({
          pathname: `/${Routes.Login}`,
          query: {
            redirect: router.asPath,
          },
        });
      } else {
        const mobileWillBindQueryParamsIfNotUserOrNotVerified = {
          ...(router?.query?.entry ? { entry: router.query.entry as string } : {}),
          ...(router?.query?.danjiID ? { depth2: router.query.danjiID as string } : {}),
          forms: JSON.stringify([...state.forms]),
          params: JSON.stringify(params),
        };
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
          query: {
            redirect: addQueryStringToUrl(
              `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
              toQueryString(mobileWillBindQueryParamsIfNotUserOrNotVerified),
            ),
          },
        });
      }
      return;
    }

    if (user && !user?.isVerified) {
      if (platform === 'pc') {
        router.push({
          pathname: `/${Routes.VerifyCi}`,
          query: {
            redirect: router.asPath,
          },
        });
      } else {
        const mobileWillBindQueryParamsIfNotUserOrNotVerified = {
          ...(router?.query?.entry ? { entry: router.query.entry as string } : {}),
          ...(router?.query?.danjiID ? { depth2: router.query.danjiID as string } : {}),
          forms: JSON.stringify([...state.forms]),
          params: JSON.stringify(params),
        };
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
          query: {
            redirect: addQueryStringToUrl(
              `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
              toQueryString(mobileWillBindQueryParamsIfNotUserOrNotVerified),
            ),
          },
        });
      }
      return;
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

        await otherMutate(() => true, undefined);

        toast.success('구해요 글이 등록되었습니다.');

        if (platform === 'pc') {
          router.replace({
            pathname: `/${Routes.My}/${Routes.SuggestRequestedList}`,
          });
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
        }
      } catch (error) {
        toast.error('등록 중 오류가 발생했습니다.');
      }
    }

    if (isEqualValue(state.danjiOrRegion, DanjiOrRegionalType.Regional)) {
      try {
        await apiService.createSuggestRegional(params);

        await dashBoardInfoMutate();

        toast.success('구해요 글이 등록되었습니다.');

        if (platform === 'pc') {
          router.replace({
            pathname: `/${Routes.My}/${Routes.SuggestRequestedList}`,
          });
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
        }
      } catch (error) {
        toast.error('등록 중 오류가 발생했습니다.');
      }
    }
  }, [dashBoardInfoMutate, platform, router, state, user]);

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
    handleFormsAction,
    handleClickBack: isRenderSummitButton ? handleClickBack : undefined,
  };
}
