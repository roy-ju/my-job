import { Chip, Separator } from '@/components/atoms';
import { RealestateType, describeRealestateType } from '@/constants/enums';
import { formatNumberInKorean } from '@/utils';
import React from 'react';

import CheveronDown from '@/assets/icons/chevron_down_24.svg';
import { DanjiSummary } from '@/layouts/Mobile/MapLayout/useMapLayout';
import { useRouter } from 'next/router';
import { styled } from 'twin.macro';
import Routes from '@/router/routes';
import { Filter } from '../MobMapFilter/types';

const StyledDiv = styled.div``;

export default function MobDanjiSummary({
  selectedDanjiSummary,
  filter,
}: {
  selectedDanjiSummary: DanjiSummary;
  filter?: Filter;
}) {
  const router = useRouter();

  const handleDanjiDetail = () => {
    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiDetail}`,
        query: {
          danjiID: selectedDanjiSummary.danjiID,
          rt: selectedDanjiSummary.realestateType,
          bor: filter?.buyOrRents || '',
        },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiDetail}?p=${selectedDanjiSummary.danjiID}&rt=${selectedDanjiSummary.realestateType}`,
    );
  };

  return (
    <div tw="w-[100%] mx-auto max-w-mobile [border-bottom-width: 1px] border-b-gray-1100 absolute rounded-t-lg px-4 py-5 bottom-[5rem] bg-white [z-index:500]">
      <StyledDiv tw="flex items-center cursor-pointer" onClick={() => handleDanjiDetail()}>
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
      </StyledDiv>
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

      {!!selectedDanjiSummary.buyPrice && selectedDanjiSummary?.latestDealDateBuy && (
        <div tw="flex items-center mt-2">
          <span tw="text-b2 [width:36px] mr-2">매매</span>
          <span tw="text-b2 font-bold">{formatNumberInKorean(selectedDanjiSummary?.buyPrice || 0)}</span>
          <div tw="ml-auto">
            <span tw="text-info [line-height: 1rem] text-gray-700">
              {`거래일 ${selectedDanjiSummary.latestDealDateBuy}` || '-'}
            </span>
          </div>
        </div>
      )}

      {!!selectedDanjiSummary?.rentPrice && selectedDanjiSummary?.latestDealDateRent && (
        <div tw="flex items-center">
          <span tw="text-b2 [width:36px] mr-2">전월세</span>
          <span tw="text-b2 font-bold">{formatNumberInKorean(selectedDanjiSummary?.rentPrice || 0)}</span>
          <div tw="ml-auto">
            <span tw="text-info [line-height: 1rem] text-gray-700">
              {`거래일 ${selectedDanjiSummary?.latestDealDateRent}` || '-'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
