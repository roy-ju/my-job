import { css } from 'twin.macro';
import { Button, Chip, Moment, Numeral } from '@/components/atoms';
import { ButtonGroup, ExpandableText } from '@/components/molecules';
import { GetMySuggestRecommendsResponse } from '@/apis/suggest/getMySuggestRecommends';
import { SuggestRecommendStatus } from '@/constants/enums';
import { BuyOrRentString } from '@/constants/strings';
import ErrorIcon from '@/assets/icons/error.svg';
import { Avatar } from '../ChatMessage/Avatar';

interface Props {
  showCheckbox?: boolean;
  item?: NonNullable<GetMySuggestRecommendsResponse['list']>[0];
  isLast?: boolean;
  onClickListing?: () => void;
  onClickChat?: () => void;
  onClickNotInterested?: () => void;
  onClickRecommendAccept?: () => void;
  onClickDeleteSuggestRecommendItem?: () => void;
}

const informationStringWrapper = css`
  & > span:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 2px;
    color: #e9ecef; // text-gray-300
  }
`;

export default function ListingRecommendListItem({
  item,
  onClickChat,
  onClickNotInterested,
  onClickRecommendAccept,
  onClickDeleteSuggestRecommendItem,
}: Props) {
  const renderCtas = () => {
    if (item?.suggest_recommend_status === SuggestRecommendStatus.Sent) {
      return (
        <ButtonGroup tw="w-full border-t border-t-gray-300">
          <Button onClick={onClickNotInterested} tw="flex-1 rounded-t-none bg-white text-gray-1000 hover:bg-gray-200">
            관심 없음
          </Button>
          <Button variant="secondary" onClick={onClickRecommendAccept} tw="flex-1 rounded-t-none">
            네고 협의 시작하기
          </Button>
        </ButtonGroup>
      );
    }
    if (item?.suggest_recommend_status === SuggestRecommendStatus.Completed && item?.chat_room_id === null) {
      return null;
    }

    if (
      item?.suggest_recommend_status === SuggestRecommendStatus.Accepted ||
      item?.suggest_recommend_status === SuggestRecommendStatus.Completed
    ) {
      return (
        <ButtonGroup tw="w-full border-t border-t-gray-300">
          <Button onClick={onClickChat} tw="flex-1 rounded-t-none">
            채팅방 바로가기
          </Button>
        </ButtonGroup>
      );
    }

    if (item?.suggest_recommend_status === SuggestRecommendStatus.Cancelled) {
      return (
        <Button
          onClick={onClickDeleteSuggestRecommendItem}
          tw="w-full border-t border-t-gray-300  rounded-t-none bg-white text-gray-1000 hover:bg-gray-200"
        >
          삭제
        </Button>
      );
    }
  };

  const renderMoments = () => (
    <div tw="text-info text-gray-700 shrink-0 self-start">
      추천일 <Moment format="yyyy.MM.DD">{item?.created_time}</Moment>
    </div>
  );

  const isOptionField = item?.direction || item?.floor || item?.jeonyong_areas;

  return (
    <div tw=" rounded-lg border border-gray-300">
      <div tw="flex items-center gap-2 px-4 pt-4 pb-3 ">
        <Avatar size={24} alt="alt" src={item?.other_profile_image_url} />
        <div tw="text-b2 font-bold mr-auto">{item?.other_name}의 추천</div>
        {renderMoments()}
      </div>
      <div tw="border-b mx-4 border-b-gray-300" />
      {!item?.with_address && item?.suggest_recommend_status === SuggestRecommendStatus.Completed && (
        <div tw="px-4 pt-3">
          <Chip variant="red">거래 성사</Chip>
        </div>
      )}
      {item?.with_address && (
        <div tw=" px-4 pt-3">
          {!!item?.trade_or_deposit_price && (
            <div tw="flex gap-1 items-center">
              {item.suggest_recommend_status === SuggestRecommendStatus.Completed && (
                <Chip variant="red">거래 성사</Chip>
              )}
              <div tw="text-b1 font-bold">
                {BuyOrRentString[item?.buy_or_rent ?? 0]} <Numeral koreanNumber>{item?.trade_or_deposit_price}</Numeral>
                {Boolean(item?.monthly_rent_fee) && (
                  <span>
                    {' / '}
                    <Numeral koreanNumber>{item?.monthly_rent_fee}</Numeral>
                  </span>
                )}
              </div>
            </div>
          )}
          {item?.address_free_text && <div tw="text-info">{item?.address_free_text}</div>}
          {isOptionField && (
            <div tw="text-info text-gray-700 flex items-center" css={informationStringWrapper}>
              {item?.jeonyong_areas && (
                <span>전용 {item?.jeonyong_areas ? Number(item.jeonyong_areas).toFixed(0) : '-'}㎡</span>
              )}
              {item?.floor && <span>{item?.floor}층</span>}
              {item?.direction && <span>{item?.direction}</span>}
            </div>
          )}
        </div>
      )}
      <div tw="flex flex-col flex-1 px-4 pt-3 pb-4">
        <ExpandableText>{item?.note}</ExpandableText>
        {item?.suggest_recommend_status === SuggestRecommendStatus.Cancelled && (
          <div tw="flex gap-1 mt-3">
            <ErrorIcon />
            <span tw="text-red-800 text-info leading-4">상대방이 추천을 취소했어요.</span>
          </div>
        )}
      </div>
      <div>{renderCtas()}</div>
    </div>
  );
}
