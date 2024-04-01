import { memo, useCallback, useEffect, useState } from 'react';

import ManRaisingHandImage from '@/../public/static/images/icon_man-raising-hand.png';

import CheckImage from '@/../public/static/images/icon_check.png';

import useFetchSubHomeGuideList from '@/services/sub-home/useFetchSubHomeGuideList';

import { GuideListItem } from '@/services/sub-home/types';

import Title from './Title';

import {
  AdditionalListItem,
  AdditionListWrraper,
  AddtionalListQuestion,
  AddtionalListText,
  CheckListContainer,
  CheckListWrraper,
  RequiredListWrraper,
} from './widget/ListingCheckListWidget';

import ListItem from './ListItem';

type ListProps = {
  tab: string;
  code: string;
};

function List({ tab, code }: ListProps) {
  const { requiredList: originalRequiredList, additionalList, isLoading } = useFetchSubHomeGuideList({ code });

  const [requiredList, setRequiredList] = useState<GuideListItem[]>([]);

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const handleCheckboxChange = useCallback(
    (id: number, isChecked: boolean) => {
      setCheckedItems((prev) => ({
        ...prev,
        [id]: isChecked,
      }));

      setRequiredList((prevList) => {
        const newList = [...prevList];

        // 해당 아이템의 인덱스를 찾는다.
        const itemIndex = newList.findIndex((item) => item.id === id);

        // 해당 아이템을 삭제
        const item = newList.splice(itemIndex, 1)[0];

        // 체크된 아이템들의 인덱스를 찾는다.
        const checkedIndexes: number[] = [];

        newList.forEach((listItem, index) => {
          if (checkedItems[listItem.id]) {
            checkedIndexes.push(index);
          }
        });

        if (isChecked) {
          // 체크된 아이템이 있는 경우
          if (checkedIndexes.length > 0) {
            // 체크된 아이템 중 가장 앞에 있는 인덱스를 찾는다.
            const insertIndex = Math.min(...checkedIndexes);
            // 해당 인덱스에 아이템을 삽입.
            newList.splice(insertIndex, 0, item);
          } else {
            // 체크된 아이템이 없는 경우, 맨 뒤로 이동
            newList.push(item);
          }
        } else {
          // 체크가 해제된 경우

          // 체크된 아이템들을 제외한 나머지 아이템들과 새로운 아이템의 순서를 비교하여 적절한 위치에 삽입
          const uncheckedItems = newList.filter((nListItem) => !checkedItems[nListItem.id]);
          const insertIndex = uncheckedItems.findIndex((unItems) => unItems.id > id);
          newList.splice(insertIndex === -1 ? uncheckedItems.length : insertIndex, 0, item);
        }

        return newList;
      });
    },
    [checkedItems],
  );

  const handleClick = useCallback(
    (id: number) => {
      handleCheckboxChange(id, !checkedItems[id]);
    },
    [checkedItems, handleCheckboxChange],
  );

  useEffect(() => {
    if (!isLoading) {
      setRequiredList([...originalRequiredList]); // 원본 리스트를 복사하여 초기화
    }
  }, [isLoading, originalRequiredList]);

  if (tab !== code) return null;

  return (
    <CheckListContainer style={tab !== code ? { display: 'none' } : {}}>
      <CheckListWrraper>
        <Title url={CheckImage.src} title="꼭 확인해야 할 항목이에요!" alt="iconCheck" />
        <RequiredListWrraper>
          {requiredList.map((item) => (
            <ListItem item={item} key={item.id} checkedItems={checkedItems} handleClick={handleClick} />
          ))}
        </RequiredListWrraper>
      </CheckListWrraper>
      {additionalList.length > 0 && (
        <CheckListWrraper tw="mt-4">
          <Title title="추가로 질문해보세요!" url={ManRaisingHandImage.src} alt="manRaisingHand" />
          <AdditionListWrraper tw="px-0">
            <AdditionListWrraper>
              {additionalList.map((item) => (
                <AdditionalListItem key={item.id}>
                  <AddtionalListQuestion>Q</AddtionalListQuestion>
                  <AddtionalListText>{item.content}</AddtionalListText>
                </AdditionalListItem>
              ))}
            </AdditionListWrraper>
          </AdditionListWrraper>
        </CheckListWrraper>
      )}
    </CheckListContainer>
  );
}

export default memo(List);
