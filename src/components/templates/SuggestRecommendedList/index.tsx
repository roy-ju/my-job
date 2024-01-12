import { GetMySuggestRecommendedListResponse } from '@/apis/suggest/getMySuggestRecommendedList';
import { NavigationHeader, NoDataUI } from '@/components/molecules';
import { InfiniteScroll } from '@/components/atoms';
import Item from './Item';

interface Props {
  suggestRecommendedList?: GetMySuggestRecommendedListResponse['list'];
  onNextListing?: () => void;
  onNavigateToSuggestRecommendedDetail?: (suggestRecommendId: number) => void;
  onNavigateToMap?: () => void;
  onClickBack?: () => void;
}

export default function SuggestRecommendedList({
  suggestRecommendedList,
  onNextListing,
  onNavigateToSuggestRecommendedDetail,
  onNavigateToMap,
  onClickBack,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>우리집 추천 내역</NavigationHeader.Title>
      </NavigationHeader>

      {suggestRecommendedList?.length ? (
        <div tw="flex-1 min-h-0 overflow-auto pb-10 flex flex-col gap-5">
          <InfiniteScroll onNext={onNextListing} tw="overflow-y-visible">
            <div tw="flex flex-col">
              {suggestRecommendedList?.map((item) => (
                <Item key={item.suggest_id} onClick={onNavigateToSuggestRecommendedDetail} item={item} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <NoDataUI
          title="추천한 매물이 없습니다."
          body="단지 정보 화면에서 구하는 글에 매물을 추천해 보세요!"
          buttonText="추천할 단지 찾기"
          onClick={onNavigateToMap}
        />
      )}
    </div>
  );
}
