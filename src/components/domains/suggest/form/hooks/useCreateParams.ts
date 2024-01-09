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

        danjiAddress: state.danjiAddress,

        danjiRealestateType: state.danjiRealestateType,

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

        pyoungList: state.pyoungList.map((item) => Number(item)).sort((a, b) => a - b),

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
  }, [state]);

  return { createParams };
}
