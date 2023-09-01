import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';
import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { SuggestDetailListItem } from '@/components/organisms';

type Props = {
  data?: GetSuggestDetailResponse;

  isExistMySuggested?: boolean;

  disabledCTA?: boolean;
  onClickCTA?: () => void;

  onClickBack?: () => void;
};

export default function SuggestDetail({
  data,

  isExistMySuggested,

  disabledCTA,
  onClickCTA,

  onClickBack,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>구해요 상세</NavigationHeader.Title>
      </NavigationHeader>

      <div tw="flex-1 px-5 pt-7">
        <SuggestDetailListItem>
          <SuggestDetailListItem.UserInfo data={data} />
          <SuggestDetailListItem.ListingInfo data={data} />
          {isExistMySuggested && <SuggestDetailListItem.MySuggestedListings />}
        </SuggestDetailListItem>
      </div>

      <PersistentBottomBar>
        <div tw="w-full [padding-bottom: 26px]">
          <Button size="bigger" tw="w-full" disabled={!!disabledCTA} onClick={onClickCTA}>
            내 매물 추천하기
          </Button>
        </div>
      </PersistentBottomBar>
    </div>
  );
}
