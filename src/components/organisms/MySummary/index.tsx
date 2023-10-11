import { Avatar, Button } from '@/components/atoms';
import { StaticImageData } from 'next/image';
import defaultAvatar from '@/../public/static/images/default_avatar.png';

interface MySummaryProps {
  profileImagePath?: string | StaticImageData;
  nickname?: string;
  profileImgaeUrl?: string;
  point?: number;
  couponCount?: number;
  onClickMyDetail?: () => void;
  onClickNegoPoint?: () => void;
  onClickCoupons?: () => void;
}

export default function MySummary({ nickname, profileImagePath, onClickMyDetail }: MySummaryProps) {
  return (
    <div tw="flex items-center px-5 pt-7 pb-10">
      <div tw="w-full flex items-center text-start">
        <Avatar size={48} src={profileImagePath || defaultAvatar} alt={`${nickname} 프로필 사진`} />
        <div tw="text-b1 font-bold ml-3 mr-1">{nickname ? `${nickname}님` : '김네고'}</div>
      </div>
      <Button onClick={onClickMyDetail} size="small" variant="outlined" tw="whitespace-nowrap">
        프로필 편집
      </Button>
    </div>
  );
}
