/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo } from 'react';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import ManRaisingHandImage from '@/../public/static/images/icon_man-raising-hand.png';

import { Checkbox } from '@/components/atoms';

import CheckImage from '@/../public/static/images/icon_check.png';
import Title from './Title';

import { ConvertedList } from './types';

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
  list: ConvertedList;
};

function List({ tab, list }: ListProps) {
  const additionalList = list[0]?.additionalList ?? [];

  const requiredList = list[0]?.requiredList ?? [];

  return (
    <CheckListContainer>
      <CheckListWrraper>
        <Title url={CheckImage.src} title="꼭 확인해야 할 항목이에요!" alt="iconCheck" />
        <RequiredListWrraper>
          {requiredList.map((item) => (
            <RequiredListItem key={item.id}>
              <Checkbox iconType="graySquare" />
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
