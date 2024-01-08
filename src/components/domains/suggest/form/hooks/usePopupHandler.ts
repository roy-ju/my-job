import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { useRouter as useCustormRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import { SearchDanjiResponseItem } from '@/apis/danji/searchDanji';

import SuggestFormState from '../atoms/SuggestFormState';

import SuggestForm, { BubjungdongType } from '../types';

import initialValues from '../constants/initialValue';

export default function usePopupHandler({ depth }: { depth?: number }) {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const customRouter = useCustormRouter(depth);

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
    if (platform === 'pc') {
      await customRouter.pop();
      reset();
    }
    if (platform === 'mobile') {
      await router.back();
      reset();
    }
  }, [customRouter, platform, reset, router]);

  const handleUpdateFormReset = useCallback(() => {
    setTimeout(() => setState({ ...(initialValues as SuggestForm), forms: ['region_or_danji'] }), 100);
  }, [setState]);

  /** 부동산 종류 초기화 화면 안됨, 주소 및 단지 정보 초기화 하면 안됨 */
  const handleConfirmChangeBuyOrRent = useCallback(() => {
    setState((prev) => ({
      ...prev,
      forms: ['region_or_danji', 'realestate_and_buyOrRent_and_price'],
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
      additionalCondtions: initialValues.additionalCondtions,
      interviewAvailabletimes: initialValues.interviewAvailabletimes,
      popup: initialValues.popup as
        | 'regionList'
        | 'danjiList'
        | 'reselectRegionOrDanji'
        | 'quit'
        | 'buyOrRent'
        | 'realestateTypes'
        | '',
      errorMessageTradeOrDepositPrice: '',
      errorMessageMonthlyRentFeePrice: '',
      errorMessageInvestAmountPrice: '',
      errorMessagePyoungInput: '',
    }));
  }, [setState]);

  /** 주소 및 단지 정보 초기화 하면 안됨 */
  const handleConfirmChangeRealestateType = useCallback(() => {
    setState((prev) => ({
      ...prev,
      forms: ['region_or_danji', 'realestate_and_buyOrRent_and_price'],
      realestateTypes: initialValues.realestateTypes,
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
      additionalCondtions: initialValues.additionalCondtions,
      interviewAvailabletimes: initialValues.interviewAvailabletimes,
      popup: initialValues.popup as
        | 'regionList'
        | 'danjiList'
        | 'reselectRegionOrDanji'
        | 'quit'
        | 'buyOrRent'
        | 'realestateTypes'
        | '',
      errorMessageTradeOrDepositPrice: '',
      errorMessageMonthlyRentFeePrice: '',
      errorMessageInvestAmountPrice: '',
      errorPyoungInput: false,
    }));
  }, [setState]);

  return {
    popup: state.popup,
    handleUpdatePopup,
    handleUpdateAddressAndBubjungdong,
    handleUpdateDanjiInfo,
    handleQuitForm,
    handleUpdateFormReset,
    handleConfirmChangeBuyOrRent,
    handleConfirmChangeRealestateType,
  };
}
