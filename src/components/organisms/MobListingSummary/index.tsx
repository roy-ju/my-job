import { Separator } from '@/components/atoms';
import Chip from '@/components/atoms/Chip';
import { RealestateType, describeRealestateType, describeTargetPrice, describeBiddingPrice } from '@/constants/enums';
import { ListingSummary } from '@/layouts/Mobile/MapLayout/useMapLayout';
import { formatNumberInKorean } from '@/utils';
import React from 'react';

import CheveronDown from '@/assets/icons/chevron_down_24.svg';

export default function MobListingSummary({ selctedListingSummary }: { selctedListingSummary: ListingSummary }) {
  return (
    selctedListingSummary && (
      <div tw="w-[100%] max-w-mobile [border-bottom-width: 1px] border-b-gray-1100 absolute rounded-t-lg px-4 py-5 bottom-[5rem] bg-white [z-index:500] mx-auto">
        <div tw="flex items-center">
          {selctedListingSummary?.realestateType === RealestateType.Apartment && (
            <Chip tw="text-green-1000 bg-green">{describeRealestateType(selctedListingSummary?.realestateType)}</Chip>
          )}
          {selctedListingSummary?.realestateType === RealestateType.Officetel && (
            <Chip tw="text-nego-1000 bg-nego-100">{describeRealestateType(selctedListingSummary?.realestateType)}</Chip>
          )}
          {selctedListingSummary?.realestateType === RealestateType.Dasaedae && (
            <Chip tw="text-green-1000 bg-orange">{describeRealestateType(selctedListingSummary?.realestateType)}</Chip>
          )}
          {selctedListingSummary?.realestateType === RealestateType.Dagagoo && (
            <Chip tw="text-orange-1000 bg-green">{describeRealestateType(selctedListingSummary?.realestateType)}</Chip>
          )}
          {selctedListingSummary?.realestateType === RealestateType.Yunrip && (
            <Chip tw="text-gray-1000 bg-gray-100">{describeRealestateType(selctedListingSummary?.realestateType)}</Chip>
          )}
          {selctedListingSummary?.realestateType === RealestateType.Dandok && (
            <Chip tw="text-blue-1000 bg-blue-100">{describeRealestateType(selctedListingSummary?.realestateType)}</Chip>
          )}
          <span tw="text-info font-bold ml-2 [font-size: 1rem]">{selctedListingSummary?.listingTitle}</span>
          <CheveronDown style={{ marginLeft: 'auto', transform: 'rotate(270deg)', cursor: 'pointer' }} />
        </div>

        <div tw="flex items-center gap-3 mt-2 mb-3">
          <span tw="text-info [line-height: 1rem] text-gray-700">
            공급 {selctedListingSummary.gonggeupArea || '-'}㎡
          </span>
          <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
          <span tw="text-info [line-height: 1rem] text-gray-700">
            전용 {selctedListingSummary.jeonyoungArea || '-'}㎡
          </span>
        </div>

        <div tw="flex items-center gap-2 mt-2">
          <div tw="flex flex-col">
            <span tw="text-b2">
              {describeTargetPrice({
                negotiation_or_auction: selctedListingSummary.negotiationOrAuction,
                isOwnerLabel: true,
              })}
            </span>
            <span tw="text-b2">{`최고 ${describeBiddingPrice({
              negotiation_or_auction: selctedListingSummary.negotiationOrAuction,
            })}`}</span>
          </div>

          <div tw="flex flex-col">
            <span tw="text-b2 font-bold">
              {selctedListingSummary.tradeOrDepositPrice
                ? formatNumberInKorean(selctedListingSummary.tradeOrDepositPrice)
                : '-'}{' '}
              {selctedListingSummary.monthlyRentFee > 0 &&
                `/ ${formatNumberInKorean(selctedListingSummary.monthlyRentFee)}`}
            </span>
            <span tw="text-b2 font-bold">
              {selctedListingSummary.biddingTradeOrDepositPrice
                ? formatNumberInKorean(selctedListingSummary.biddingTradeOrDepositPrice)
                : '-'}{' '}
              {selctedListingSummary.biddingMonthlyRentFee > 0 &&
                `/ ${formatNumberInKorean(selctedListingSummary.biddingMonthlyRentFee || 0)}`}
            </span>
          </div>
        </div>
      </div>
    )
  );
}
