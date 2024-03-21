import { memo, useCallback, useEffect, useState } from 'react';

import tw from 'twin.macro';

import ManRaisingHandImage from '@/../public/static/images/icon_man-raising-hand.png';

import { Checkbox } from '@/components/atoms';

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
  RequiredListItem,
  RequiredListWrraper,
} from './widget/ListingCheckListWidget';

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
        const itemIndex = newList.findIndex((item) => item.id === id);
        const item = newList[itemIndex];

        newList.splice(itemIndex, 1);

        const checkedIndexes = newList
          .map((listItem, index) => (checkedItems[listItem.id] ? index : -1))
          .filter((index) => index !== -1);

        if (isChecked) {
          if (checkedIndexes.length > 0) {
            newList.splice(checkedIndexes[0], 0, item);
          } else {
            newList.push(item);
          }
        } else {
          const originalIndex = originalRequiredList.findIndex((originalItem) => originalItem.id === id);
          newList.splice(originalIndex, 0, item);
        }

        return newList;
      });
    },
    [checkedItems, originalRequiredList],
  );

  useEffect(() => {
    if (!isLoading) {
      setRequiredList([...originalRequiredList]); // 원본 리스트를 복사하여 초기화
    }
  }, [isLoading, originalRequiredList]);

  return (
    <CheckListContainer css={[tab !== code && tw`[display: none]`]}>
      <CheckListWrraper>
        <Title url={CheckImage.src} title="꼭 확인해야 할 항목이에요!" alt="iconCheck" />

        <RequiredListWrraper>
          {requiredList.map((item) => (
            <RequiredListItem key={item.id} css={[checkedItems[item.id] && tw`text-gray-600 bg-gray-200`]}>
              <Checkbox
                iconType="graySquare"
                checked={checkedItems[item.id] || false}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  handleCheckboxChange(id, e.target.checked);
                }}
                value={item.id}
              />
              {item.content}
            </RequiredListItem>
          ))}
        </RequiredListWrraper>
      </CheckListWrraper>

      {additionalList.length > 0 && (
        <CheckListWrraper>
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
