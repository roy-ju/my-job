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

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

type AdditionalListProps = {
  list: GuideListItem[];
};

export default function AdditionalList({ list }: AdditionalListProps) {
  if (!list.length) return null;

  return (
    <CheckListWrraper tw="mt-4" initial="hidden" animate="visible" variants={listVariants}>
      <Title title="추가로 질문해보세요!" url={ManRaisingHandImage.src} alt="manRaisingHand" />
      <AdditionListWrraper tw="px-0">
        <AdditionListWrraper>
          {list.map((item) => (
            <AdditionalListItem key={item.id} variants={itemVariants} layout>
              <AddtionalListQuestion>Q</AddtionalListQuestion>
              <AddtionalListText>{item.content}</AddtionalListText>
            </AdditionalListItem>
          ))}
        </AdditionListWrraper>
      </AdditionListWrraper>
    </CheckListWrraper>
  );
}
