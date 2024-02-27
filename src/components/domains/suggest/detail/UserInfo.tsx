import tw, { styled } from 'twin.macro';

import { Avatar } from '@/components/atoms';

const UserInfoWrraper = styled.div`
  ${tw`flex flex-row items-center gap-1 pb-2.5`}
`;

type UserInfoProps = {
  imgSrc?: string;
  nickname?: string;
};

export default function UserInfo({ imgSrc, nickname }: UserInfoProps) {
  return (
    <UserInfoWrraper>
      {imgSrc && <Avatar size={24} src={imgSrc} alt="" />}
      {nickname && <span tw="text-gray-700 text-info [letter-spacing: -0.4px]">{nickname}</span>}
    </UserInfoWrraper>
  );
}
