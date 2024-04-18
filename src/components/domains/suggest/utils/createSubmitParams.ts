import { DanjiOrRegionalType } from '@/constants/enums';

import suggestDanjiParams from './suggestDanjiParams';

import suggestRegionParams from './suggestRegionParams';

import SuggestForm, { BubjungdongType } from '../form/types';

import isEqualValue from './isEqualValue';

export default function createSubmitParams(state: SuggestForm) {
  if (isEqualValue(state.danjiOrRegion, DanjiOrRegionalType.Danji)) {
    return suggestDanjiParams({
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
      pyoungList: state.pyoungList
        .map((item) => Number(item))
        .sort((a, b) => a - b)
        .map((item) => item.toString()),
      description: state.additionalConditions.join(','),
      interviewAvailabletimes: state.interviewAvailabletimes,
    });
  }

  if (isEqualValue(state.danjiOrRegion, DanjiOrRegionalType.Regional)) {
    return suggestRegionParams({
      bubjungdong: state.bubjungdong as BubjungdongType[],
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
      description: state.additionalConditions.join(','),
      interviewAvailabletimes: state.interviewAvailabletimes,
    });
  }

  return null;
}
