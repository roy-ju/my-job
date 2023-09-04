import { Avatar } from '@/components/atoms';
import React from 'react';
import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';
import { styled } from 'twin.macro';
import { formatCreatedTime } from '@/utils/formatLastMessageTime';

interface Props {
  data?: GetSuggestDetailResponse | null;
}

const Wrraper = styled('div')``;

export default function UserInfo({ data }: Props) {
  return (
    <Wrraper tw="flex items-center gap-1 mb-4 w-full">
      {data?.user_profile_image_url && <Avatar size={24} src={data?.user_profile_image_url} alt="" />}
      {data?.user_nickname && <span tw="text-gray-700 text-info [letter-spacing: -0.4px]">{data.user_nickname}</span>}
      {data?.created_time && (
        <span tw="ml-auto text-gray-700 text-info [letter-spacing: -0.4px]">
          {formatCreatedTime(data.created_time)}
        </span>
      )}
    </Wrraper>
  );
}
