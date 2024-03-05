import moment from 'moment';

import { Chip } from '@/components/atoms';

import { BuyOrRent, DanjiOrRegionalType, describeTimeType, RealestateType } from '@/constants/enums';

import { RealestateTypeString } from '@/constants/strings';

import { formatNumberInKorean } from '@/utils';

import { IChatRoomDetailRecommendItem } from '@/services/chat/type';

import useClientAccordionHandler from './hooks/useClientAccordionHandler';

type RecommendItemCardProps = { item: IChatRoomDetailRecommendItem; count: number };

export function RecommendItemCard({ item }: Omit<RecommendItemCardProps, 'count'>) {
  const { handleClickNavigateToSuggestRecommended } = useClientAccordionHandler();

  const buyOrRentText = item.buy_or_rents === BuyOrRent.Buy.toString() ? '매매' : '전월세';
  const realestateTypes = Array.from(
    new Set(
      item?.realestate_types
        ?.split(',')
        .map((d) => Number(d))
        .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
    ),
  );

  return (
    <button
      type="button"
      tw="w-full [text-align: left] h-[72px] flex flex-row bg-white px-4 py-2 items-center hover:bg-gray-300 cursor-pointer"
      onClick={() => handleClickNavigateToSuggestRecommended?.(item.suggest_id)}
    >
      <div tw="min-w-[60px]">
        <Chip variant={item.danji_or_regional === DanjiOrRegionalType.Danji ? 'nego' : 'blue'}>
          {item.danji_or_regional === DanjiOrRegionalType.Danji ? '단지' : '지역'}
        </Chip>
      </div>

      <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-gray-800">
        <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
          {item.request_target_text}
        </div>
        <div tw="text-body_01">
          {item.quick_sale ? '급매물' : buyOrRentText}
          {!item.quick_sale && <>&nbsp;|&nbsp;</>}
          {!item.quick_sale &&
            (item.monthly_rent_fee
              ? `${formatNumberInKorean(item.trade_or_deposit_price)} / ${formatNumberInKorean(item.monthly_rent_fee)}`
              : `${formatNumberInKorean(item.trade_or_deposit_price)}`)}
        </div>
        <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
          {item.danji_or_regional === DanjiOrRegionalType.Regional &&
            `${realestateTypes.map((i) => RealestateTypeString[i])}`}

          {item.danji_or_regional === DanjiOrRegionalType.Regional && item.pyoung_text && (
            <>
              &nbsp;|&nbsp;
              {item.pyoung_text}
            </>
          )}

          {item.danji_or_regional === DanjiOrRegionalType.Danji && item.pyoung_text && <>{item.pyoung_text}</>}

          {item.move_in_date && (
            <>
              &nbsp;|&nbsp; 입주희망일 : {moment(item.move_in_date).format('YY.MM.DD')}{' '}
              {describeTimeType(item.move_in_date_type)}
            </>
          )}

          {!!item.invest_amount && <>&nbsp;|&nbsp; 투자예산 : {formatNumberInKorean(item.invest_amount)}</>}
        </div>
      </div>
    </button>
  );
}

export function RecommendItemCardHeader({ count }: Omit<RecommendItemCardProps, 'item'>) {
  return (
    <div tw="flex flex-row items-center">
      <div tw="[border-radius: 50%] w-0.5 h-0.5 bg-gray-1000 mx-2" />
      추천한 구해요 요청
      <div tw="ml-auto mr-0.5 text-subhead_01 text-nego">
        {count} <span tw="text-body_01 text-gray-800 ml-0.5">건</span>
      </div>
    </div>
  );
}
