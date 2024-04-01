import { StaticImageData } from 'next/image';

import { Avatar, Button } from '@/components/atoms';

import defaultAvatar from '@/../public/static/images/default_avatar.png';

interface UserSummaryProps {
  name?: string;
  nickname?: string;
  profileImagePath?: string | StaticImageData;
  onClickMyDetail?: () => void;
}

export default function UserSummary({ name, nickname, profileImagePath, onClickMyDetail }: UserSummaryProps) {
  return (
    <div tw="flex items-center px-5 pt-7 pb-10">
      <div tw="w-full flex items-center text-start">
        <Avatar size={48} src={profileImagePath || defaultAvatar} alt={`${nickname} 프로필 사진`} />
        <div tw="ml-3 mr-1 flex flex-col">
          <div tw="text-subhead_03">
            {name ? (name === '이름없음' ? `${name}` : `${name}님`) : '이름을 입력해주세요.'}
          </div>
          <div tw="text-body_01 text-gray-700">{nickname || '-'}</div>
        </div>
      </div>
      <Button onClick={onClickMyDetail} size="small" variant="outlined" tw="whitespace-nowrap">
        회원정보
      </Button>
    </div>
  );
}
