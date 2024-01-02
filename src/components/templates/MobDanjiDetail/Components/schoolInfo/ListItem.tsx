import { memo } from 'react';

import { styled } from 'twin.macro';

import { SchoolItem } from '@/services/danji/types';

import checkStudentCount from '@/utils/checkStudentCount';

import getDistance from '@/utils/getDistance';

const Item = styled.li``;

type ListItemProps = {
  isTitle?: boolean;
  item?: SchoolItem;
  handleClick?: () => void;
};

function ListItem({ isTitle = false, item, handleClick }: ListItemProps) {
  if (isTitle)
    return (
      <li tw="w-full flex pb-2 [border-bottom: 1px solid #E9ECEF]">
        <p tw="flex-[2.5] min-w-[9.125rem] [font-size: 14px] [line-height: 22px] text-gray-700">학교명</p>
        <p tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right] text-gray-700">기관</p>
        <p tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right] text-gray-700">학급당</p>
        <p tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right] text-gray-700">거리</p>
      </li>
    );

  return (
    <Item key={item?.school_id} tw="flex py-2 [border-bottom: 1px solid #F4F6FA]" onClick={handleClick}>
      <div tw="flex-[2.5] min-w-[9.125rem] [font-size: 14px] [line-height: 22px]">{item?.name || '-'}</div>
      <div tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right]">
        {item?.found_type || '-'}
      </div>
      <div tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right]">
        {checkStudentCount(item?.students_per_teacher_count)}
      </div>
      <div tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right]">
        {getDistance(item?.distance_in_km)}
      </div>
    </Item>
  );
}

export default memo(ListItem);
