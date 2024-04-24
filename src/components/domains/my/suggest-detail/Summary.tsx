import tw, { styled, theme } from 'twin.macro';

import { SuggestDetailResponse } from '@/services/suggests/types';

import ArrowRight from '@/assets/icons/arrow_right_20.svg';

import ArrowDown from '@/assets/icons/arrow_down_20.svg';

import { DanjiOrRegionalType } from '@/constants/enums';
import { replaceRegionNames } from '@/utils/replaceSigunguNames';
import useSummaryCTAHandler from './hooks/useSummaryCTAHandler';

import RealestatatesLabel from './RealestatatesLabel';

import PurposeOrMoveInDate from './PurposeOrMoveInDate';

import AdditionalConditions from './AdditionalConditions';

import Note from './Note';

import CreatedTime from '../suggest-requested-list/CreatedTime';

import Price from '../suggest-requested-list/Price';

import BuyOrRent from '../suggest-requested-list/BuyOrRent';

import Negotiable from '../suggest-requested-list/Negotiable';

import Pyoung from '../suggest-requested-list/Pyoung';

type SummaryProps = { data: SuggestDetailResponse & ErrorResponse };

const MySuggestInfo = styled.div`
  ${tw`px-5 py-2`}
`;

const SummaryHeader = styled.div`
  ${tw`flex flex-row items-center`}
`;

const SummaryInfo = styled.div`
  ${tw`flex flex-col gap-0.5 pt-2`}
`;

const TitleButton = styled.button`
  ${tw`flex flex-row items-center gap-0.5`}
`;

const Title = styled.p`
  ${tw`text-left text-gray-800 text-heading_01 [max-width: 313px]`}
`;

const BuyOrRentPriceNegotiableWrraper = styled.div`
  ${tw`text-gray-700 text-body_02`}
`;

const Seperator = styled.div`
  ${tw`w-full [min-height: 24px]`}
`;

const SummaryDetailHeader = styled.div`
  ${tw`border-t border-t-gray-200`}
`;

const SummaryDetailHeaderButton = styled.button`
  ${tw`flex items-center justify-center gap-0.5 mx-auto w-full h-full py-4 [-webkit-tap-highlight-color: transparent]`}

  span {
    ${tw`text-gray-700 text-body_02`}
  }
`;

export default function Summary({ data }: SummaryProps) {
  const { openSummaryDetail, renderRoutingDanjiDetailButton, handleRouterDanjiDetail, handleClickOpenSummaryDetail } =
    useSummaryCTAHandler({ data });

  return (
    <>
      <MySuggestInfo>
        <SummaryHeader>
          <RealestatatesLabel realestates={data.realestate_types} />
          <CreatedTime time={data.created_time ?? ''} />
        </SummaryHeader>

        <SummaryInfo>
          <TitleButton
            css={[!renderRoutingDanjiDetailButton && tw`pointer-events-none`]}
            onClick={handleRouterDanjiDetail}
          >
            <Title>
              {data.danji_or_regional === DanjiOrRegionalType.Danji
                ? data.request_target_text
                : replaceRegionNames(data.request_target_text)}
            </Title>
            {renderRoutingDanjiDetailButton && <ArrowRight color={theme`colors.gray.700`} />}
          </TitleButton>
          <BuyOrRentPriceNegotiableWrraper>
            <BuyOrRent buyOrRents={data.buy_or_rents} />
            <Price
              tradeOrDepositPrice={data.trade_or_deposit_price ?? 0}
              monthlyRentFee={data.monthly_rent_fee ?? 0}
              quickSale={data.quick_sale ?? false}
            />
            <Negotiable negotiable={data.negotiable ?? false} />
          </BuyOrRentPriceNegotiableWrraper>
          <Pyoung pyoung={data.pyoung_text} />
        </SummaryInfo>
      </MySuggestInfo>
      <Seperator />

      {openSummaryDetail && (
        <div tw="py-8 border-t mx-5 flex flex-col gap-5">
          <PurposeOrMoveInDate
            buyOrRent={data?.buy_or_rents}
            purpose={data?.purpose}
            investAmount={data?.invest_amount ?? 0}
            moveInDate={data?.move_in_date}
            moveInDateType={data?.move_in_date_type}
          />

          {data?.additional_conditions && (
            <AdditionalConditions
              buyOrRents={data.buy_or_rents}
              danjiOrRegion={data.danji_or_regional}
              realestateTypes={data.realestate_types}
              additionalConditions={data.additional_conditions}
            />
          )}

          <Note note={data?.note} />
        </div>
      )}

      <SummaryDetailHeader>
        <SummaryDetailHeaderButton onClick={handleClickOpenSummaryDetail}>
          <span>{openSummaryDetail ? '접기' : '자세히 보기'} </span>
          <ArrowDown
            color={theme`colors.gray.600`}
            css={[openSummaryDetail ? tw`transition rotate-180` : tw`transition rotate-0`]}
          />
        </SummaryDetailHeaderButton>
      </SummaryDetailHeader>
    </>
  );
}
