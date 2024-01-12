import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useResetRecoilState } from 'recoil';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import { SearchDanjiResponseItem } from '@/apis/danji/searchDanji';

import Routes from '@/router/routes';

import { RealestateType } from '@/constants/enums';

import SuggestFormState from '../atoms/SuggestFormState';

import SuggestForm, { BubjungdongType } from '../types';

import initialValues from '../constants/initialValue';

import isEqualValue from '../../utils/isEqualValue';

export default function usePopupHandler() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const [state, setState] = useRecoilState(SuggestFormState);

  const reset = useResetRecoilState(SuggestFormState);

  const handleUpdatePopup = useCallback(
    (value: SuggestForm['popup']) => {
      setState((prev) => ({ ...prev, popup: value }));
    },
    [setState],
  );

  const handleUpdateAddressAndBubjungdong = useCallback(
    async (v: BubjungdongType) => {
      setState((prev) => ({
        ...prev,
        address: v.name,
        bubjungdong: v,
        forms: [...prev.forms, 'realestate_and_buyOrRent_and_price'],
        popup: '',
      }));
    },
    [setState],
  );

  const handleUpdateDanjiInfo = useCallback(
    async (v: SearchDanjiResponseItem) => {
      setState((prev) => ({
        ...prev,
        danjiID: v.danji_id.toString(),
        danjiRealestateType: v.realestate_type,
        danjiAddress: v.address,
        danjiName: v.name,
        forms: [...prev.forms, 'realestate_and_buyOrRent_and_price'],
        realestateTypes: [v.realestate_type],
        popup: '',
      }));
    },
    [setState],
  );

  const handleQuitForm = useCallback(async () => {
    if (isEqualValue(platform, 'pc')) {
      if (isEqualValue(router?.query?.entry, Routes.Home)) {
        await router.replace(`/`);
      }

      if (isEqualValue(router?.query?.entry, Routes.DanjiDetail)) {
        await router.replace(`/${Routes.DanjiDetail}?danjiID=${router?.query?.danjiID}`);
      }

      if (isEqualValue(router?.query?.entry, Routes.SuggestListings)) {
        await router.replace(`/${Routes.SuggestListings}?danjiID=${router?.query?.danjiID}`);
      }

      if (isEqualValue(router?.query?.entry, Routes.SuggestRequestedList)) {
        await router.replace(`/${Routes.My}?default=1`);
      }

      if (isEqualValue(router?.query?.entry, Routes.ChatRoomList)) {
        await router.replace(`/${Routes.My}?default=1`);
      }

      if (!router?.query?.entry || isEqualValue(router?.query?.entry, Routes.Map)) {
        await router.replace(`/${Routes.Map}`);
      }
    }

    if (platform === 'mobile') {
      if (isEqualValue(router?.query?.entry, Routes.Home)) {
        await router.replace(`/${Routes.EntryMobile}`);
      }

      if (isEqualValue(router?.query?.entry, Routes.DanjiDetail)) {
        await router.replace(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${router?.query?.danjiID}`);
      }

      if (isEqualValue(router?.query?.entry, Routes.SuggestListings)) {
        await router.replace(`/${Routes.EntryMobile}/${Routes.SuggestListings}?danjiID=${router?.query?.danjiID}`);
      }

      if (isEqualValue(router?.query?.entry, Routes.SuggestRequestedList)) {
        await router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=1`);
      }

      if (isEqualValue(router?.query?.entry, Routes.ChatRoomList)) {
        await router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=1`);
      }

      if (!router?.query?.entry || isEqualValue(router?.query?.entry, Routes.Map)) {
        await router.replace(`/${Routes.Map}`);
      }
    }

    setTimeout(() => reset(), 200);
  }, [platform, reset, router]);

  const handleUpdateFormReset = useCallback(() => {
    setTimeout(() => setState({ ...(initialValues as SuggestForm), forms: ['region_or_danji'] }), 100);
  }, [setState]);

  const handleCloseBuyOrRentChangePopup = useCallback(() => {
    handleUpdatePopup('');
    setState((prev) => ({ ...prev, uiBuyOrRent: undefined }));
  }, [handleUpdatePopup, setState]);

  const handleCloseRealestateTypeChangePopup = useCallback(() => {
    handleUpdatePopup('');
    setState((prev) => ({ ...prev, uiRealestateType: undefined }));
  }, [handleUpdatePopup, setState]);

  /** 부동산 종류 초기화 화면 안됨, 주소 및 단지 정보 초기화 하면 안됨 */
  const handleConfirmChangeBuyOrRent = useCallback(() => {
    setState((prev) => ({
      ...prev,
      forms: ['region_or_danji', 'realestate_and_buyOrRent_and_price'],
      buyOrRent: state.uiBuyOrRent ? state.uiBuyOrRent : initialValues.buyOrRent,
      tradeOrDepositPrice: initialValues.tradeOrDepositPrice,
      monthlyRentFee: initialValues.monthlyRentFee,
      negotiable: initialValues.negotiable,
      quickSale: initialValues.quickSale,
      moveInDate: initialValues.moveInDate,
      moveInDateType: initialValues.moveInDateType as '이전' | '이후' | '당일' | '',
      purpose: initialValues.purpose as '투자' | '실거주' | '',
      investAmount: initialValues.investAmount,
      pyoungInput: initialValues.pyoungInput,
      pyoungList: initialValues.pyoungList,
      note: initialValues.note,
      additionalConditions: initialValues.additionalConditions,
      interviewAvailabletimes: initialValues.interviewAvailabletimes,
      popup: initialValues.popup as
        | 'regionList'
        | 'danjiList'
        | 'reselectRegionOrDanji'
        | 'quit'
        | 'buyOrRent'
        | 'realestateTypes'
        | 'invalidAccess'
        | '',
      errorMessageTradeOrDepositPrice: '',
      errorMessageMonthlyRentFeePrice: '',
      errorMessageInvestAmountPrice: '',
      errorMessagePyoungInput: '',
    }));
  }, [setState, state?.uiBuyOrRent]);

  /** 주소 및 단지 정보 초기화 하면 안됨 */
  const handleConfirmChangeRealestateType = useCallback(() => {
    setState((prev) => ({
      ...prev,
      forms: ['region_or_danji', 'realestate_and_buyOrRent_and_price'],
      realestateTypes: state.uiRealestateType ? [Number(state.uiRealestateType)] : initialValues.realestateTypes,
      buyOrRent: initialValues.buyOrRent,
      tradeOrDepositPrice: initialValues.tradeOrDepositPrice,
      monthlyRentFee: initialValues.monthlyRentFee,
      negotiable: initialValues.negotiable,
      quickSale: initialValues.quickSale,
      moveInDate: initialValues.moveInDate,
      moveInDateType: initialValues.moveInDateType as '이전' | '이후' | '당일' | '',
      purpose: initialValues.purpose as '투자' | '실거주' | '',
      investAmount: initialValues.investAmount,
      pyoungInput: initialValues.pyoungInput,
      pyoungList: initialValues.pyoungList,
      note: initialValues.note,
      additionalConditions: initialValues.additionalConditions,
      interviewAvailabletimes: initialValues.interviewAvailabletimes,
      popup: initialValues.popup as
        | 'regionList'
        | 'danjiList'
        | 'reselectRegionOrDanji'
        | 'quit'
        | 'buyOrRent'
        | 'realestateTypes'
        | 'invalidAccess'
        | '',
      errorMessageTradeOrDepositPrice: '',
      errorMessageMonthlyRentFeePrice: '',
      errorMessageInvestAmountPrice: '',
      errorPyoungInput: false,
    }));
  }, [setState, state?.uiRealestateType]);

  const isFilter = useMemo(() => {
    if (isEqualValue(router?.query?.property, '아파트') && isEqualValue(router?.query?.entry, Routes.Home)) {
      return true;
    }

    if (isEqualValue(router?.query?.property, '오피스텔') && isEqualValue(router?.query?.entry, Routes.Home)) {
      return true;
    }

    return false;
  }, [router?.query?.entry, router?.query?.property]);

  const filterQuery = useMemo(() => {
    if (isEqualValue(router?.query?.property, '아파트') && isEqualValue(router?.query?.entry, Routes.Home)) {
      return RealestateType.Apartment;
    }

    if (isEqualValue(router?.query?.property, '오피스텔') && isEqualValue(router?.query?.entry, Routes.Home)) {
      return RealestateType.Officetel;
    }
  }, [router?.query?.entry, router?.query?.property]);

  return {
    popup: state.popup,
    isFilter,
    filterQuery,
    handleUpdatePopup,
    handleUpdateAddressAndBubjungdong,
    handleUpdateDanjiInfo,
    handleQuitForm,
    handleUpdateFormReset,
    handleConfirmChangeBuyOrRent,
    handleConfirmChangeRealestateType,
    handleCloseBuyOrRentChangePopup,
    handleCloseRealestateTypeChangePopup,
  };
}
