import { GetMySuggestListResponse } from '@/apis/suggest/getMySuggestList';
import { Button, InfiniteScroll } from '@/components/atoms';
import { NavigationHeader, NoDataUI } from '@/components/molecules';
import { SuggestRequestedListItem } from '@/components/organisms';
import tw, { styled } from 'twin.macro';

const ListContainer = styled(InfiniteScroll)`
  width: 100%;
  & > div:not(:last-of-type) > button > div {
    ${tw`border-b border-b-gray-300`}
  }
`;

interface Props {
  list?: GetMySuggestListResponse['list'];
  onClickSuggestForm?: () => void;
  onClickSuggestItem?: (id: number) => void;
  onNext?: () => void;
  onClickBack?: () => void;
}

export default function SuggestRequestedList({
  list,
  onClickSuggestForm,
  onClickSuggestItem,
  onNext,
  onClickBack,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>구하기 게시 내역</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex flex-col flex-1 min-h-0">
        {list?.length !== 0 ? (
          <div tw="flex flex-col flex-1 min-h-0">
            <div tw="p-5">
              <Button onClick={onClickSuggestForm} tw="w-full" variant="secondary">
                새로운 매물 구하기
              </Button>
            </div>
            <div tw="flex flex-1 min-h-0 overflow-auto">
              <ListContainer onNext={onNext}>
                {list?.map((item) => (
                  <SuggestRequestedListItem
                    key={item.suggest_id}
                    item={item}
                    onClick={() => onClickSuggestItem?.(item.suggest_id)}
                  />
                ))}
              </ListContainer>
            </div>
          </div>
        ) : (
          <NoDataUI
            title="구하는 글이 없습니다."
            body="구하기 글을 작성하고 원하는 곳의 매물을 추천받아보세요."
            buttonText="새로운 매물 구하기"
            onClick={onClickSuggestForm}
          />
        )}
      </div>
    </div>
  );
}
