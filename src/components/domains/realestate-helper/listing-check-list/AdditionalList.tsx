import ManRaisingHandImage from '@/../public/static/images/icon_man-raising-hand.png';

import { GuideListItem } from '@/services/sub-home/types';

import Title from './Title';

import {
  AdditionalListItem,
  AdditionListWrraper,
  AddtionalListQuestion,
  AddtionalListText,
  CheckListWrraper,
} from './widget/ListingCheckListWidget';

type AdditionalListProps = {
  list: GuideListItem[];
};

export default function AdditionalList({ list }: AdditionalListProps) {
  if (!list.length) return null;

  return (
    <CheckListWrraper tw="mt-4">
      <Title title="추가로 질문해보세요!" url={ManRaisingHandImage.src} alt="manRaisingHand" />
      <AdditionListWrraper tw="px-0">
        <AdditionListWrraper>
          {list.map((item) => (
            <AdditionalListItem key={item.id}>
              <AddtionalListQuestion>Q</AddtionalListQuestion>
              <AddtionalListText>{item.content}</AddtionalListText>
            </AdditionalListItem>
          ))}
        </AdditionListWrraper>
      </AdditionListWrraper>
    </CheckListWrraper>
  );
}
