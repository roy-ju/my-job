import { Avatar } from '@/components/atoms';
import { StaticImageData } from 'next/image';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import { theme } from 'twin.macro';
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
    <div>
      <button
        type="button"
        tw="w-full py-6 px-5 flex items-center text-start  hover:bg-gray-50"
        onClick={onClickMyDetail}
      >
        <Avatar size={48} src={profileImagePath || defaultAvatar} alt={`${nickname} 프로필 사진`} />
        <div tw="text-b1 font-bold ml-3 mr-1">{nickname ?? '김네고'}</div>
        <ChevronLeftIcon
          width={16}
          height={16}
          color={theme`colors.gray.700`}
          style={{ transform: 'rotate(180deg)' }}
        />
      </button>
    </div>
  );
}
