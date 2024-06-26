import { useCallback, useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import moment from 'moment';

import { describeRealestateType, describeJeonsaeWolsaeSame, BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import { formatNumberInKorean } from '@/utils';

import { describeBuyOrRentPriceTitle } from '@/utils/fotmat';

import { replaceRegionNames } from '@/utils/replaceSigunguNames';

import sortTimes from '@/utils/sortTimes';
import getPriceFormatFn from '../../utils/getPriceFormat';

import isEqualValue from '../../utils/isEqualValue';

import SuggestFormState from '../atoms/SuggestFormState';

import createSelectedSummaryHashTags from '../../utils/createSelectedSummaryHashTags';

export default function useGetSummary() {
  const {
    danjiOrRegion,
    address,
    danjiName,
    danjiRealestateType,
    realestateTypes,
    purpose,
    moveInDate,
    moveInDateType,
    investAmount,
    buyOrRent,
    quickSale,
    negotiable,
    monthlyRentFee,
    tradeOrDepositPrice,
    pyoungList,
    additionalConditions,
    interviewAvailabletimes,
  } = useRecoilValue(SuggestFormState);

  const locationData = useCallback(() => {
    if (address.length > 0 && typeof address !== 'string') {
      return address.map((item) => (
        <span key={item} tw="block">
          {replaceRegionNames(item)}
        </span>
      ));
    }

    if (danjiName) return danjiName;

    return '';
  }, [address, danjiName]);

  const realestateData = useCallback(() => {
    if (danjiRealestateType) {
      return describeRealestateType(danjiRealestateType);
    }

    if (realestateTypes && realestateTypes.length > 0) {
      return realestateTypes.map((item) => describeRealestateType(item)).join(', ');
    }

    return '';
  }, [danjiRealestateType, realestateTypes]);

  const buyOrRentData = useCallback(() => {
    if (!buyOrRent) return '';

    return describeJeonsaeWolsaeSame(buyOrRent);
  }, [buyOrRent]);

  const priceData = useCallback(() => {
    if (isEqualValue(buyOrRent, BuyOrRent.Buy) && isEqualValue(quickSale, '1')) {
      return '급매물 구해요';
    }

    if (tradeOrDepositPrice && monthlyRentFee) {
      return `${describeBuyOrRentPriceTitle(buyOrRent)} ${formatNumberInKorean(Number(tradeOrDepositPrice) * 10000, {
        formatFn: getPriceFormatFn,
      })}원 / ${describeBuyOrRentPriceTitle(BuyOrRent.Wolsae)}
        ${formatNumberInKorean(Number(monthlyRentFee) * 10000, {
          formatFn: getPriceFormatFn,
        })} ${negotiable ? ' (금액 협의 가능)' : ''}`;
    }

    if (tradeOrDepositPrice) {
      return `${describeBuyOrRentPriceTitle(buyOrRent)} ${formatNumberInKorean(Number(tradeOrDepositPrice) * 10000, {
        formatFn: getPriceFormatFn,
      })} ${negotiable ? ' (금액 협의 가능)' : ''}`;
    }

    return '';
  }, [buyOrRent, monthlyRentFee, negotiable, quickSale, tradeOrDepositPrice]);

  const purposeData = useCallback(() => {
    if (purpose && investAmount) {
      return `${purpose} / ${formatNumberInKorean(Number(investAmount) * 10000, {
        formatFn: getPriceFormatFn,
      })}`;
    }

    if (purpose && moveInDate && moveInDateType) {
      return `${purpose} / ${moment(moveInDate).format('YY.MM.DD')} ${moveInDateType} 입주`;
    }

    return '';
  }, [investAmount, moveInDate, moveInDateType, purpose]);

  const moveInDateData = useCallback(() => {
    if (moveInDate && moveInDateType) {
      return `${moment(moveInDate).format('YY.MM.DD')} ${moveInDateType} 입주`;
    }

    return '';
  }, [moveInDate, moveInDateType]);

  const pyoungsData = useCallback(() => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      return pyoungList.map((item) => `${item}평`).join(', ');
    }

    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Regional)) {
      return pyoungList.map((item) => item).join(', ');
    }

    return '';
  }, [danjiOrRegion, pyoungList]);

  const addtionalCondtionsData = useCallback(() => {
    const result = createSelectedSummaryHashTags({
      danjiOrRegion,
      buyOrRent,
      realestateType: realestateTypes,
      selectedConditions: additionalConditions,
    });

    return result;
  }, [additionalConditions, buyOrRent, danjiOrRegion, realestateTypes]);

  const interviewAvailabletimesData = useCallback(() => {
    if (interviewAvailabletimes && interviewAvailabletimes.length > 0) {
      return sortTimes(interviewAvailabletimes.map((item) => item.replaceAll(' 에 인터뷰 가능해요.', ''))).join(' / ');
    }

    return '';
  }, [interviewAvailabletimes]);

  const isRenderPurpose = useMemo(() => !!(buyOrRent && purpose), [buyOrRent, purpose]);

  return {
    locationData,
    realestateData,
    buyOrRentData,
    priceData,
    purposeData,
    moveInDateData,
    pyoungsData,
    addtionalCondtionsData,
    interviewAvailabletimesData,
    isRenderPurpose,
  };
}
