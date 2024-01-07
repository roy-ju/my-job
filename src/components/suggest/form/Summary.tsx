import { useRecoilValue } from 'recoil';

import { BuyOrRent, DanjiOrRegionalType, describeJeonsaeWolsaeSame, describeRealestateType } from '@/constants/enums';

import moment from 'moment';

import formatNumberInKorean from '@/utils/formatNumberInKorean';

import tw, { styled } from 'twin.macro';
import { motion } from 'framer-motion';
import SuggestFormState from './atoms/SuggestFormState';

import SummaryContainer from './ui/SummaryContainer';
import getPriceFormatFn from '../utils/getPriceFormat';
import isEqualValue from '../utils/isEqualValue';

const AdditionalConditionWrraper = styled(motion.div)`
  ${tw`text-body_01 [border-radius: 100px] border [border-color: #646464] [height: 26px] [padding-inline: 7px] flex items-center justify-center`}
`;

export default function Summary() {
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

  const locationData = () => {
    if (address) return address;

    if (danjiName) return danjiName;

    return '';
  };

  const realestateData = () => {
    if (danjiRealestateType) {
      return describeRealestateType(danjiRealestateType);
    }

    if (realestateTypes && realestateTypes.length > 0) {
      return realestateTypes.map((item) => describeRealestateType(item)).join(', ');
    }

    return '';
  };

  const buyOrRentData = () => {
    if (!buyOrRent) return '';

    return describeJeonsaeWolsaeSame(buyOrRent);
  };

  const priceData = () => {
    if (isEqualValue(buyOrRent, BuyOrRent.Buy) && isEqualValue(quickSale, '1')) {
      return '급매';
    }

    if (tradeOrDepositPrice && monthlyRentFee) {
      return `${formatNumberInKorean(Number(tradeOrDepositPrice) * 10000, {
        formatFn: getPriceFormatFn,
      })} /
        ${formatNumberInKorean(Number(monthlyRentFee) * 10000, {
          formatFn: getPriceFormatFn,
        })} ${negotiable && '(금액 협의 가능)'}`;
    }

    if (tradeOrDepositPrice) {
      return `${formatNumberInKorean(Number(tradeOrDepositPrice) * 10000, {
        formatFn: getPriceFormatFn,
      })} ${negotiable && '(금액 협의 가능)'}`;
    }

    return '';
  };

  const purposeData = () => {
    if (purpose && investAmount) {
      return `${purpose} ${formatNumberInKorean(Number(investAmount) * 10000, {
        formatFn: getPriceFormatFn,
      })}`;
    }

    if (purpose && moveInDate && moveInDateType) {
      return `${purpose} ${moment(moveInDate).format('YY.MM.DD')} ${moveInDateType}`;
    }

    return '';
  };

  const pyounsData = () => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      return pyoungList.map((item) => `${item}평`).join(', ');
    }

    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Regional)) {
      return pyoungList.join(', ');
    }

    return '';
  };

  const addtionalCondtionsData = () => {
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
  };

  const interviewAvailabletimesData = () => {
    if (interviewAvailabletimes && interviewAvailabletimes.length > 0) {
      return interviewAvailabletimes.join(', ');
    }

    return '';
  };

  return (
    <div id="formSummary" tw="w-full flex-1 flex flex-col min-h-0 overflow-y-auto pt-10 pb-10 px-5 gap-6">
      <SummaryContainer title="위치">{locationData()}</SummaryContainer>

      <SummaryContainer title="부동산 종류">{realestateData()}</SummaryContainer>

      <SummaryContainer title="거래 종류">{buyOrRentData()}</SummaryContainer>

      <SummaryContainer title="가격">{priceData()}</SummaryContainer>

      <SummaryContainer title="매매 목적" isRender={!!(buyOrRent && purpose)}>
        {purposeData()}
      </SummaryContainer>

      <SummaryContainer title="평형 조건">{pyounsData()}</SummaryContainer>

      <SummaryContainer title="추가 조건">{addtionalCondtionsData()}</SummaryContainer>

      <SummaryContainer title="인터뷰">{interviewAvailabletimesData()}</SummaryContainer>
    </div>
  );
}
