import { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import { DanjiOrRegionalType } from '@/constants/enums';

import SuggestFormState from '../atoms/SuggestFormState';

import { BubjungdongType } from '../types';

import isEqualValue from '../../utils/isEqualValue';

import createDanjiSuggestParams from '../../utils/createDanjiSuggestParams';

import createRegionSuggestParams from '../../utils/createRegionSuggestParams';

export default function useCreateParams() {
  const state = useRecoilValue(SuggestFormState);

  const createParams = useCallback(() => {
    if (isEqualValue(state.danjiOrRegion, DanjiOrRegionalType.Danji)) {
      return createDanjiSuggestParams({
        danjiID: state.danjiID || '',

        name: state.danjiName,

        buyOrRent: state.buyOrRent,

        tradeOrDepositPrice: state.tradeOrDepositPrice,

        monthlyRentFee: state.monthlyRentFee,

        negotiable: state.negotiable,

        quickSale: state.quickSale,

        purpose: state.purpose,

        investAmount: state.investAmount,

        moveInDate: state.moveInDate,

        moveInDateType: state.moveInDateType,

        pyoungList: state.pyoungList.map((item) => Number(item)),

        description: state.additionalCondtions.join(','),

        interviewAvailabletimes: state.interviewAvailabletimes,
      });
    }

    if (isEqualValue(state.danjiOrRegion, DanjiOrRegionalType.Regional)) {
      return createRegionSuggestParams({
        bubjungdong: state.bubjungdong as BubjungdongType,

        realestateType: state.realestateTypes,

        buyOrRent: state.buyOrRent,

        tradeOrDepositPrice: state.tradeOrDepositPrice,

        monthlyRentFee: state.monthlyRentFee,

        negotiable: state.negotiable,

        minArea: state.pyoungList.join(','),

        maxArea: '',

        purpose: state.purpose,

        investAmount: state.investAmount,

        moveInDate: state.moveInDate,

        moveInDateType: state.moveInDateType,

        description: state.additionalCondtions.join(','),

        interviewAvailabletimes: state.interviewAvailabletimes,
      });
    }

    return null;
  }, [
    state.additionalCondtions,
    state.bubjungdong,
    state.buyOrRent,
    state.danjiID,
    state.danjiName,
    state.danjiOrRegion,
    state.interviewAvailabletimes,
    state.investAmount,
    state.monthlyRentFee,
    state.moveInDate,
    state.moveInDateType,
    state.negotiable,
    state.purpose,
    state.pyoungList,
    state.quickSale,
    state.realestateTypes,
    state.tradeOrDepositPrice,
  ]);

  return { createParams };
}
