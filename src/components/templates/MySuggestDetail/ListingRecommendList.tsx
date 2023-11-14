import { GetMySuggestRecommendsResponse } from '@/apis/suggest/getMySuggestRecommends';
import { InfiniteScroll } from '@/components/atoms';
import { NoDataUI } from '@/components/molecules';
import { ListingRecommendListItem } from '@/components/organisms';

interface Props {
  recommendData?: GetMySuggestRecommendsResponse['list'];
  onClickChat?: (id: number) => void;
  onClickNotInterested?: (id: number) => void;
  onClickRecommendAccept?: (id: number) => void;
  onNext?: () => void;
  onClickDeleteSuggestRecommendItem?: (id: number) => void;
}

export default function ListingRecommendList({
  recommendData,
  onClickChat,
  onClickNotInterested,
  onClickRecommendAccept,
  onNext,
  onClickDeleteSuggestRecommendItem,
}: Props) {
  if (!recommendData?.length) {
    return <NoDataUI title="추천받은 매물이 없습니다." body="집주인과 중개사의 추천을 기다려 주세요." />;
  }

  return (
    <div tw="py-7 px-5">
      <InfiniteScroll onNext={onNext}>
        <div tw="flex flex-col gap-7">
          {recommendData?.map((item) => (
            <ListingRecommendListItem
              key={item.suggest_recommend_id}
              item={item}
              onClickChat={() => onClickChat?.(item?.chat_room_id ?? 0)}
              onClickNotInterested={() => onClickNotInterested?.(item.suggest_recommend_id)}
              onClickRecommendAccept={() => onClickRecommendAccept?.(item.suggest_recommend_id)}
              onClickDeleteSuggestRecommendItem={() => onClickDeleteSuggestRecommendItem?.(item.suggest_recommend_id)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
