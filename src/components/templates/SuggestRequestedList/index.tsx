import { GetMySuggestListResponse } from '@/apis/suggest/getMySuggestList';
import { Button, InfiniteScroll } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { SuggestRequestedListItem, SuggestRequestedListNoData } from '@/components/organisms';
import { SuggestStatus } from '@/constants/enums';
import { useCallback } from 'react';
import tw, { styled } from 'twin.macro';
import { checkPlatform } from '@/utils/checkPlatform';

const ListContainer = styled(InfiniteScroll)`
  width: 100%;
  & > div:not(:last-of-type) > button > div {
    ${tw`border-b border-b-gray-300`}
  }
`;

interface Props {
  list?: GetMySuggestListResponse['list'];
  listStyle?: 'default' | 'delete';
  onClickRecommendationForm?: () => void;
  onClickDelete?: () => void;
  onChangeListStyle?: (style: 'default' | 'delete') => void;
  onChangeSuggestChecked?: (id: number, checked: boolean) => void;
  onClickSuggestItem?: (id: number) => void;
  onNext?: () => void;
  onClickBack?: () => void;
}

export default function SuggestRequestedList({
  list,
  listStyle = 'default',
  onClickRecommendationForm,
  onClickDelete,
  onChangeListStyle,
  onChangeSuggestChecked,
  onClickSuggestItem,
  onNext,
  onClickBack,
}: Props) {
  const handleListItemCheckedStateChange = useCallback(
    (id: number) => (checked: boolean) => {
      onChangeSuggestChecked?.(id, checked);
    },
    [onChangeSuggestChecked],
  );

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>중개사가 추천한 매물</NavigationHeader.Title>
        {Boolean(list?.length) && (
          <div>
            {listStyle === 'default' && (
              <NavigationHeader.Button tw="text-b2 underline" onClick={() => onChangeListStyle?.('delete')}>
                선택삭제
              </NavigationHeader.Button>
            )}
            {listStyle === 'delete' && (
              <div tw="flex gap-3">
                <NavigationHeader.Button tw="text-b2 underline" onClick={() => onChangeListStyle?.('default')}>
                  취소
                </NavigationHeader.Button>
                <NavigationHeader.Button tw="text-b2 underline" onClick={onClickDelete}>
                  삭제하기
                </NavigationHeader.Button>
              </div>
            )}
          </div>
        )}
      </NavigationHeader>
      <div tw="flex flex-col flex-1 min-h-0">
        {list?.length !== 0 ? (
          <div tw="flex flex-col flex-1 min-h-0">
            {checkPlatform() !== 'pc' && listStyle === 'default' && (
              <div tw="p-5">
                <Button onClick={onClickRecommendationForm} tw="w-full" variant="secondary">
                  새로운 매물 추천 받아보기
                </Button>
              </div>
            )}
            <div tw="flex flex-1 min-h-0 overflow-auto">
              <ListContainer onNext={onNext}>
                {list?.map((item) => (
                  <SuggestRequestedListItem
                    key={item.suggest_id}
                    item={item}
                    onChange={handleListItemCheckedStateChange(item.suggest_id)}
                    onClick={() => onClickSuggestItem?.(item.suggest_id)}
                    inputType={listStyle === 'delete' ? 'checkbox' : 'none'}
                    checked={listStyle === 'default' ? item.status === SuggestStatus.Active : undefined}
                  />
                ))}
              </ListContainer>
            </div>
          </div>
        ) : (
          <div tw="py-7">
            <SuggestRequestedListNoData onClick={onClickRecommendationForm} />
          </div>
        )}
      </div>
    </div>
  );
}
