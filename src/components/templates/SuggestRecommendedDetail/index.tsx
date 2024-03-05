import { ExpandableText, NavigationHeader } from '@/components/molecules';

import { Button, Chip, Moment, Numeral } from '@/components/atoms';

import { GetMySuggestRecommendedDetailResponse } from '@/apis/suggest/getMySuggestRecommendedDetail';

import { RealestateType, BuyOrRent, SuggestRecommendStatus, SuggestStatus } from '@/constants/enums';

import { RealestateTypeString, TimeTypeString } from '@/constants/strings';

import ExclamationMarkIcon from '@/assets/icons/exclamation_mark_nego.svg';

import ExclamationMarkRedIcon from '@/assets/icons/exclamation_mark_red.svg';

import tw, { css } from 'twin.macro';

import { Avatar } from '@/components/domains/chat/room/widget/Avatar';

const chipVariantByRealestateType: Record<number, 'nego' | 'green' | 'red' | 'blue' | 'orange'> = {
  [RealestateType.Apartment]: 'nego',
  [RealestateType.Officetel]: 'green',
  [RealestateType.Dandok]: 'red',
  [RealestateType.Dagagoo]: 'blue',
  [RealestateType.Yunrip]: 'orange',
  [RealestateType.Dasaedae]: 'orange',
};

function NegotiableChip() {
  return (
    <div tw="text-gray-900 rounded text-info [font-size: 11px] bg-white px-1.5 h-5 border border-gray-300">
      협의가능
    </div>
  );
}

const informationStringWrapper = css`
  & > span:not(:first-of-type)::before {
    content: '';
    width: 1px;
    height: 8px;
    background-color: #e9ecef;
    margin: 0 4px;
    display: inline-block;
  }
`;

function PriceText({
  tradeOrDepositPrice,
  monthlyRentFee,
  quickSale,
}: {
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  quickSale: boolean;
}) {
  if (quickSale) return <span>급매 구해요</span>;

  if (monthlyRentFee) {
    return (
      <>
        <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
      </>
    );
  }
  return <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>;
}

interface Props {
  onClickBack?: () => void;
  data?: GetMySuggestRecommendedDetailResponse;
  onChatClick?: () => void;
  onChatRoomReopen?: () => void;
  onSuggestComplete?: () => void;
  onDanjiClick?: () => void;
  onMyRecommendCancel?: (suggestRecommendId: number) => void;
  onMyRecommendDelete?: (suggestRecommendId: number) => void;
}

export default function SuggestRecommendedDetail({
  data,
  onClickBack,
  onDanjiClick,
  onChatClick,
  onChatRoomReopen,
  onSuggestComplete,
  onMyRecommendCancel,
  onMyRecommendDelete,
}: Props) {
  const buyOrRentText = Number(data?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세';

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>우리집 추천 상세</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="py-6 px-5">
        <div tw="border border-gray-300 p-4 rounded-lg">
          {/* 구해요 카드 */}
          <div tw="flex flex-col gap-4 mb-4">
            {/* 구해요 헤더 */}
            <div tw="flex items-center justify-between">
              <div tw="flex items-center gap-1">
                <Avatar
                  size={24}
                  alt="profile_img"
                  src={
                    data?.deregistered
                      ? process.env.NEXT_PUBLIC_NEGOCIO_DELETED_PROFILE_IMG_PATH
                      : data?.suggestor_profile_image_url
                  }
                />
                <span tw="text-subhead_02" css={data?.deregistered && tw`text-gray-900`}>
                  {data?.suggestor_nickname}
                </span>
              </div>
              <div tw="text-body_01 text-gray-700">
                <Moment format="relative">{data?.created_time}</Moment>
              </div>
            </div>
            {/* 구해요 인포 */}
            <div>
              <div tw="flex gap-1 mb-1">
                {data?.realestate_types?.split(',').map((d) => (
                  <Chip key={d} variant={chipVariantByRealestateType[+d]}>
                    {RealestateTypeString[+d]}
                  </Chip>
                ))}
                <button type="button" onClick={onDanjiClick}>
                  <span tw="line-clamp-1 text-gray-700 text-body_01 underline">{data?.request_target_text}</span>
                </button>
              </div>
              <div tw="flex items-center mb-1">
                <div tw="text-b1 font-bold text-gray-1000 mr-1">
                  {buyOrRentText}{' '}
                  <PriceText
                    tradeOrDepositPrice={data?.trade_or_deposit_price ?? 0}
                    monthlyRentFee={data?.monthly_rent_fee ?? 0}
                    quickSale={data?.quick_sale ?? false}
                  />
                </div>
                {data?.negotiable && <NegotiableChip />}
              </div>
              <div>
                {data?.pyoung_text && <div tw="text-body_01 text-gray-700">평형: {data?.pyoung_text}</div>}
                {data?.move_in_date && (
                  <div tw="text-gray-700 text-info">
                    입주가능일 <Moment format="YY.MM.DD">{data?.move_in_date}</Moment>{' '}
                    {TimeTypeString[data?.move_in_date_type]}
                  </div>
                )}
              </div>
              {data?.note && <ExpandableText tw="mt-3">{data?.note}</ExpandableText>}
            </div>
            {/* 구해요 CTA 혹은 상태 */}
            {!data?.suggest_recommend_ever_user_accepted && (
              <div tw="flex gap-1 items-center text-body_01 text-nego-800">
                <ExclamationMarkIcon />
                <span>아직 협의 개시 전입니다.</span>
              </div>
            )}
            {data?.suggest_recommend_ever_user_accepted && (
              <div tw="flex gap-2">
                <Button disabled={data.deregistered} tw="flex-1" variant="primary" onClick={onSuggestComplete}>
                  거래 성사 선언
                </Button>
                <Button
                  onClick={data?.chat_room_is_deleted ? onChatRoomReopen : onChatClick}
                  tw="flex-1"
                  variant={data?.chat_room_is_deleted ? 'gray' : 'outlined'}
                >
                  {data?.chat_room_is_deleted ? '채팅 복원하기' : '채팅 바로가기'}
                </Button>
              </div>
            )}
          </div>
          {/* 추천 카드 */}
          <div tw="flex flex-col gap-4">
            {(data?.suggest_recommends ?? []).map((recommend) => (
              <div key={recommend.suggest_recommend_id} tw="bg-gray-100 p-4 rounded-lg">
                {/* 헤더 */}
                <div tw="flex items-center justify-between">
                  <div tw="text-info text-gray-700 shrink-0 self-start">
                    추천일 <Moment format="yyyy.MM.DD">{recommend.created_time}</Moment>
                  </div>
                  <button
                    onClick={() => {
                      if (
                        recommend.suggest_recommend_status === SuggestRecommendStatus.Sent ||
                        recommend.suggest_recommend_status === SuggestRecommendStatus.Accepted
                      ) {
                        onMyRecommendCancel?.(recommend.suggest_recommend_id);
                      } else {
                        onMyRecommendDelete?.(recommend.suggest_recommend_id);
                      }
                    }}
                    tw="text-gray-700 text-body_01 underline"
                    type="button"
                  >
                    {recommend.suggest_recommend_status === SuggestRecommendStatus.Sent ||
                    recommend.suggest_recommend_status === SuggestRecommendStatus.Accepted
                      ? '추천 취소'
                      : '삭제'}
                  </button>
                </div>
                {/* 컨텐츠 */}
                <div tw="text-b1 font-bold text-gray-1000 mr-1">
                  {buyOrRentText}{' '}
                  <PriceText
                    tradeOrDepositPrice={recommend.trade_or_deposit_price ?? 0}
                    monthlyRentFee={recommend?.monthly_rent_fee ?? 0}
                    quickSale={false}
                  />
                </div>
                <div tw="text-body_01 text-gray-1000">{recommend.address_free_text}</div>
                <div tw="text-info text-gray-700 flex items-center" css={informationStringWrapper}>
                  {recommend?.jeonyong_areas && (
                    <span>전용 {recommend?.jeonyong_areas ? Number(recommend.jeonyong_areas).toFixed(0) : '-'}㎡</span>
                  )}
                  {recommend?.floor && <span>{recommend?.floor}층</span>}
                  {recommend?.direction && <span>{recommend?.direction}</span>}
                </div>
                {/* 노트 */}
                {recommend.note && <ExpandableText tw="mt-3">{recommend.note}</ExpandableText>}
                {/* 스테이터스 */}
                {(data?.suggest_status === SuggestStatus.Deleted ||
                  recommend.suggest_recommend_status === SuggestRecommendStatus.NotInterested) && (
                  <div tw="flex gap-1 items-center text-red-800 text-body_01 mt-3">
                    <ExclamationMarkRedIcon />
                    <div>요청자가 추천을 취소하였습니다.</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
