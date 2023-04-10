import { Chip, Separator } from '@/components/atoms';
import { RealestateType, describeRealestateType } from '@/constants/enums';
import { formatNumberInKorean } from '@/utils';
import React from 'react';

import CheveronDown from '@/assets/icons/chevron_down_24.svg';
import { DanjiSummary } from '@/layouts/Mobile/MapLayout/useMapLayout';

export default function MobDanjiSummary({ selectedDanjiSummary }: { selectedDanjiSummary: DanjiSummary }) {
  return (
    <div tw="w-[100%] mx-auto max-w-mobile [border-bottom-width: 1px] border-b-gray-1100 absolute rounded-t-lg px-4 py-5 bottom-[5.25rem] bg-white [z-index:500]">
      <div tw="flex items-center">
        {selectedDanjiSummary?.realestateType === RealestateType.Apartment && (
          <Chip tw="text-green-1000 bg-green">{describeRealestateType(selectedDanjiSummary?.realestateType)}</Chip>
        )}
        {selectedDanjiSummary?.realestateType === RealestateType.Officetel && (
          <Chip tw="text-nego-1000 bg-nego-100">{describeRealestateType(selectedDanjiSummary?.realestateType)}</Chip>
        )}
        {selectedDanjiSummary?.realestateType === RealestateType.Dasaedae && (
          <Chip tw="text-green-1000 bg-orange">{describeRealestateType(selectedDanjiSummary?.realestateType)}</Chip>
        )}
        {selectedDanjiSummary?.realestateType === RealestateType.Dagagoo && (
          <Chip tw="text-orange-1000 bg-green">{describeRealestateType(selectedDanjiSummary?.realestateType)}</Chip>
        )}
        {selectedDanjiSummary?.realestateType === RealestateType.Yunrip && (
          <Chip tw="text-gray-1000 bg-gray-100">{describeRealestateType(selectedDanjiSummary?.realestateType)}</Chip>
        )}
        {selectedDanjiSummary?.realestateType === RealestateType.Dandok && (
          <Chip tw="text-blue-1000 bg-blue-100">{describeRealestateType(selectedDanjiSummary?.realestateType)}</Chip>
        )}
        <span tw="text-info font-bold ml-2 [font-size: 1rem]">{selectedDanjiSummary?.string}</span>
        <CheveronDown style={{ marginLeft: 'auto', transform: 'rotate(270deg)', cursor: 'pointer' }} />
      </div>
      <div tw="flex items-center gap-2 mt-2 mb-2">
        <div>
          <span tw="text-info [line-height: 1rem]">매매&nbsp;&nbsp;</span>
          <span tw="font-bold text-info [line-height: 1rem] text-nego-1000">
            {selectedDanjiSummary?.buyListingCount}
          </span>
        </div>
        <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
        <div>
          <span tw="text-info [line-height: 1rem]">전월세&nbsp;&nbsp;</span>
          <span tw="font-bold text-info [line-height: 1rem] text-green-1000">
            {selectedDanjiSummary?.rentListingCount}
          </span>
        </div>
        <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
        <span tw="text-info [line-height: 1rem] text-gray-700">
          사용승인일 {selectedDanjiSummary?.useAcceptedYear || '-'}
        </span>
        <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
        <span tw="text-info [line-height: 1rem] text-gray-700">
          {selectedDanjiSummary?.saedaeCount.toLocaleString() || '-'}세대
        </span>
      </div>
      <div tw="flex items-center gap-2 mt-2 mb-5">
        <Chip tw="text-yellow-1000 bg-yellow">최근 실거래</Chip>
        <span tw="text-info [line-height: 1rem] text-gray-700">
          {`거래일 ${selectedDanjiSummary?.latestDealDate}` || '-'}
        </span>
      </div>
      {(!!selectedDanjiSummary.buyPrice || !!selectedDanjiSummary.rentPrice) && (
        <div tw="flex flex-col gap-2 mt-2">
          {!!selectedDanjiSummary?.buyPrice && (
            <div tw="flex items-center">
              <span tw="text-b2 [margin-right: 3.75rem]">매매</span>
              <span tw="text-b2 font-bold">{formatNumberInKorean(selectedDanjiSummary?.buyPrice || 0)}</span>
            </div>
          )}
          {!!selectedDanjiSummary?.rentPrice && (
            <div>
              <span tw="text-b2 [margin-right: 3rem]">전월세</span>
              <span tw="text-b2 font-bold">{formatNumberInKorean(selectedDanjiSummary?.rentPrice || 0)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
