import { Avatar, Chip } from '@/components/atoms';
import React from 'react';
import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';
import { styled } from 'twin.macro';
import { formatCreatedTime } from '@/utils/formatsTime';
import { SuggestStatus } from '@/constants/enums';

import ViewIcon from '@/assets/icons/view.svg';

interface Props {
  data?: GetSuggestDetailResponse | null;
}

const Wrraper = styled('div')``;

export default function UserInfo({ data }: Props) {
  const ChipText = {
    MySuggest: '내가 쓴글',
    IamRecommending: '우리집 추천중',
    Completed: '거래성사',
  };

  return (
    <Wrraper tw="flex items-center gap-1 mb-4 w-full">
      {data?.user_profile_image_url && <Avatar size={24} src={data?.user_profile_image_url} alt="" />}

      {data?.user_nickname && <span tw="text-gray-700 text-info [letter-spacing: -0.4px]">{data.user_nickname}</span>}

      {data?.my_suggest && <Chip variant="nego">{ChipText.MySuggest}</Chip>}

      {data?.suggest_status === SuggestStatus.Completed && <Chip variant="red">{ChipText.Completed}</Chip>}

      {data?.created_time && (
        <span tw="ml-3 text-gray-700 text-info [letter-spacing: -0.4px]">{formatCreatedTime(data.created_time)}</span>
      )}

      {!!data?.view_count && (
        <div tw="flex items-center gap-1 text-info text-gray-700 ml-auto">
          <ViewIcon />
          <span>조회수</span>
          <span>{data.view_count}</span>
        </div>
      )}
    </Wrraper>
  );
}
