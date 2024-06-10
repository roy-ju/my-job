import { memo } from 'react';

import tw, { styled } from 'twin.macro';

import { SchoolItem } from '@/services/danji/types';

import checkStudentCount from '@/utils/checkStudentCount';

import getDistance from '@/utils/getDistance';

const ListItemTitleWrraper = styled.li`
  ${tw`flex w-full pb-2 border-b border-b-gray-300`}
`;

const ListTitle = styled.p<{ alignType: 'none' | 'right' }>`
  ${tw`text-gray-700 text-body_02`}

  ${({ alignType }) => (alignType === 'none' ? tw`flex-[2.5] min-w-[9.125rem]` : tw`flex-1 min-w-[4rem] text-right`)}
`;

const ListItemContentsWrraper = styled.li`
  ${tw`flex py-2 [border-bottom: 1px solid #F4F6FA]`}
`;

const ListContent = styled.div<{ alignType: 'none' | 'right' }>`
  ${tw`text-body_02`}

  ${({ alignType }) => (alignType === 'none' ? tw`flex-[2.5] min-w-[9.125rem]` : tw`flex-1 min-w-[4rem] text-right`)}
`;

type ListItemProps = {
  selected?: boolean;
  isTitle?: boolean;
  item?: SchoolItem;
  handleClick?: () => void;
};

function ListItem({ selected = false, isTitle = false, item, handleClick }: ListItemProps) {
  return isTitle ? (
    <ListItemTitleWrraper>
      <ListTitle alignType="none">학교명</ListTitle>
      <ListTitle alignType="right">기관</ListTitle>
      <ListTitle alignType="right">학급당</ListTitle>
      <ListTitle alignType="right">거리</ListTitle>
    </ListItemTitleWrraper>
  ) : (
    <ListItemContentsWrraper
      key={item?.school_id}
      onClick={handleClick}
      css={[selected && tw`bg-nego-100`, tw`cursor-pointer`]}
    >
      <ListContent alignType="none">{item?.name || '-'}</ListContent>
      <ListContent alignType="right">{item?.found_type || '-'}</ListContent>
      <ListContent alignType="right">{checkStudentCount(item?.students_per_teacher_count)}</ListContent>
      <ListContent alignType="right">{getDistance(item?.distance_in_km)}</ListContent>
    </ListItemContentsWrraper>
  );
}

export default memo(ListItem);
