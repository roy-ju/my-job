import { GetMySuggestListResponse } from '@/apis/suggest/getMySuggestList';
import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { SuggestRequestedListItem, SuggestRequestedListNoData } from '@/components/organisms';
import { SuggestStatus } from '@/constants/enums';
import { useCallback } from 'react';
import tw, { styled } from 'twin.macro';

const ListContainer = styled.div`
  width: 100%;
  & > div:not(:last-of-type) > button > div {
    ${tw`border-b border-b-gray-300`}
  }
`;

interface Props {
  list?: GetMySuggestListResponse['list'];
  listStyle?: 'default' | 'delete';
  onClickSuggestRegional?: () => void;
  onClickDelete?: () => void;
  onChangeListStyle?: (style: 'default' | 'delete') => void;
  onChangeSuggestChecked?: (id: number, checked: boolean) => void;
  onClickSuggestItem?: (id: number) => void;
}

export default function SuggestRequestedList({
  list,
  listStyle = 'default',
  onClickSuggestRegional,
  onClickDelete,
  onChangeListStyle,
  onChangeSuggestChecked,
  onClickSuggestItem,
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
        <NavigationHeader.Title>나의 추천 요청</NavigationHeader.Title>
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
            {listStyle === 'default' && (
              <div tw="pb-5 px-5 pt-1">
                <Button onClick={onClickSuggestRegional} tw="w-full" variant="secondary">
                  새로운 매물 추천 받아보기
                </Button>
              </div>
            )}
            {listStyle === 'default' && <div tw="px-5 text-end text-info">추천 그만받기</div>}
            <div tw="flex flex-1 min-h-0 overflow-auto">
              <ListContainer>
                {list?.map((item) => (
                  <SuggestRequestedListItem
                    key={item.suggest_id}
                    item={item}
                    onChange={handleListItemCheckedStateChange(item.suggest_id)}
                    onClick={() => onClickSuggestItem?.(item.suggest_id)}
                    inputType={listStyle === 'delete' ? 'checkbox' : 'switch'}
                    checked={listStyle === 'default' ? item.status === SuggestStatus.Stopped : undefined}
                  />
                ))}
              </ListContainer>
            </div>
          </div>
        ) : (
          <div tw="py-7">
            <SuggestRequestedListNoData />
          </div>
        )}
      </div>
    </div>
  );
}
