import { GetMySuggestDetailResponse } from '@/apis/suggest/getMySuggestDetail';
import { NavigationHeader } from '@/components/molecules';
import { GetMySuggestRecommendsResponse } from '@/apis/suggest/getMySuggestRecommends';
import { Separator, Switch } from '@/components/atoms';
import { SuggestDetailListItem } from '@/components/organisms';
import ListingRecommendList from './ListingRecommendList';

interface Props {
  recommendCount?: number;
  suggestData?: GetMySuggestDetailResponse | null;
  recommendData?: GetMySuggestRecommendsResponse['list'];
  suggestChecked?: boolean;
  onClickBack?: () => void;
  onClickChat?: (id: number) => void;
  onClickSuggestUpdate?: () => void;
  onClickDanjiDetail?: () => void;
  onClickNotInterested?: (id: number) => void;
  onClickRecommendAccept?: (id: number) => void;
  onClickNewRecommendations?: () => void;
  onNextListingRecommentList?: () => void;
  onChangeSuggestChecked?: (checked: boolean) => void;
}

export default function SuggestDetail({
  recommendData,
  recommendCount = 0,
  suggestData,
  onClickBack,
  onClickChat,
  onClickSuggestUpdate,
  onClickDanjiDetail,
  onClickNotInterested,
  onClickRecommendAccept,
  onClickNewRecommendations,
  onNextListingRecommentList,
  suggestChecked,
  onChangeSuggestChecked,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>구해요 상세</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="h-px bg-gray-300" />
      <div tw="px-5 pt-7 pb-10">
        <SuggestDetailListItem
          suggestData={suggestData}
          onClickSuggestUpdate={onClickSuggestUpdate}
          onClickDanjiDetail={onClickDanjiDetail}
        />
      </div>
      <Separator tw="bg-gray-300 h-2" />
      <div tw="pt-10 px-5 flex justify-between items-center">
        <div tw="text-gray-1000 text-b1 font-bold">
          추천 받은 매물 <span tw="text-nego-800">{recommendCount}</span>
        </div>
        <div tw="flex items-center gap-2">
          <span tw="text-gray-1000 text-b2 leading-5">추천 받기</span>{' '}
          <Switch checked={suggestChecked} onChange={(e) => onChangeSuggestChecked?.(e.target.checked)} />
        </div>
      </div>
      <div tw="flex-1 min-h-0 overflow-auto">
        <ListingRecommendList
          onNext={onNextListingRecommentList}
          recommendData={recommendData}
          onClickChat={onClickChat}
          onClickNotInterested={onClickNotInterested}
          onClickRecommendAccept={onClickRecommendAccept}
          onClickNewRecommendations={onClickNewRecommendations}
        />
      </div>
    </div>
  );
}
