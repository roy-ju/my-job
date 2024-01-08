import { useCallback, useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import moment from 'moment';

import { describeRealestateType, describeJeonsaeWolsaeSame, BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import { formatNumberInKorean } from '@/utils';

import AdditionalConditionWrraper from '../ui/AdditionalContionsWrraper';

import getPriceFormatFn from '../../utils/getPriceFormat';

import isEqualValue from '../../utils/isEqualValue';

import SuggestFormState from '../atoms/SuggestFormState';

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
    additionalCondtions,
    interviewAvailabletimes,
  } = useRecoilValue(SuggestFormState);

  const locationData = useCallback(() => {
    if (address) return address;

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
      return '급매';
    }

    if (tradeOrDepositPrice && monthlyRentFee) {
      return `${formatNumberInKorean(Number(tradeOrDepositPrice) * 10000, {
        formatFn: getPriceFormatFn,
      })} /
        ${formatNumberInKorean(Number(monthlyRentFee) * 10000, {
          formatFn: getPriceFormatFn,
        })} ${negotiable ? ' (금액 협의 가능)' : ''}`;
    }

    if (tradeOrDepositPrice) {
      return `${formatNumberInKorean(Number(tradeOrDepositPrice) * 10000, {
        formatFn: getPriceFormatFn,
      })} ${negotiable ? ' (금액 협의 가능)' : ''}`;
    }

    return '';
  }, [buyOrRent, monthlyRentFee, negotiable, quickSale, tradeOrDepositPrice]);

  const purposeData = useCallback(() => {
    if (purpose && investAmount) {
      return `${purpose} ${formatNumberInKorean(Number(investAmount) * 10000, {
        formatFn: getPriceFormatFn,
      })}`;
    }

    if (purpose && moveInDate && moveInDateType) {
      return `${purpose} ${moment(moveInDate).format('YY.MM.DD')} ${moveInDateType}`;
    }

    return '';
  }, [investAmount, moveInDate, moveInDateType, purpose]);

  const pyounsData = useCallback(() => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      return pyoungList.map((item) => `${item}평`).join(', ');
    }

    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Regional)) {
      return pyoungList.join(', ');
    }

    return '';
  }, [danjiOrRegion, pyoungList]);

  const addtionalCondtionsData = useCallback(() => {
    if (additionalCondtions && additionalCondtions.length > 0) {
      return (
        <div tw="flex flex-wrap [gap: 5px]">
          {additionalCondtions.map((item) => (
            <AdditionalConditionWrraper
              key={item}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {item}
            </AdditionalConditionWrraper>
          ))}
        </div>
      );
    }

    return '';
  }, [additionalCondtions]);

  const interviewAvailabletimesData = useCallback(() => {
    if (interviewAvailabletimes && interviewAvailabletimes.length > 0) {
      return interviewAvailabletimes.join(', ');
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
    pyounsData,
    addtionalCondtionsData,
    interviewAvailabletimesData,
    isRenderPurpose,
  };
}
