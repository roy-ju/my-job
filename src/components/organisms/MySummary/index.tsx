import { Avatar, Button, Loading } from '@/components/atoms';
import { StaticImageData } from 'next/image';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import { theme } from 'twin.macro';

interface SummaryItemProps {
  title: string;
  value: string;
}

function SummaryItem({ title, value }: SummaryItemProps) {
  return (
    <Button variant="ghost" tw="w-[123px] flex flex-col items-center">
      <div tw="text-info text-gray-700">{title}</div>
      <div tw="text-b1 text-nego-1000 font-bold">{value}</div>
    </Button>
  );
}

interface MySummaryProps {
  isLoading?: boolean;
  profileImagePath?: string | StaticImageData;
  nickname?: string;
  point?: number;
  couponCount?: number;
}

export default function MySummary({ isLoading, nickname, profileImagePath }: MySummaryProps) {
  if (isLoading) {
    return (
      <div tw="h-[185px] flex items-center justify-center">
        <Loading tw="text-center" />
      </div>
    );
  }

  return (
    <div>
      <button type="button" tw="w-full py-6 px-5 flex items-center text-start border-b border-b-gray-300">
        <Avatar size={48} src={profileImagePath} />
        <div tw="text-b1 font-bold ml-3 mr-1">{nickname ?? '김네고'}</div>
        <ChevronLeftIcon
          width={16}
          height={16}
          color={theme`colors.gray.700`}
          style={{ transform: 'rotate(180deg)' }}
        />
      </button>
      <div tw="py-5 flex items-center justify-center">
        <SummaryItem title="포인트" value="999,000P" />
        <div tw="w-[2px] h-6 bg-gray-300" />
        <SummaryItem title="쿠폰" value="6장" />
      </div>
    </div>
  );
}
