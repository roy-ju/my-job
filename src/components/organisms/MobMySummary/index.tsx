import { Avatar, Button } from '@/components/atoms';
import { StaticImageData } from 'next/image';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import { theme } from 'twin.macro';

interface SummaryItemProps {
  title: string;
  value: string;
  onClick?: () => void;
}

function SummaryItem({ title, value, onClick }: SummaryItemProps) {
  return (
    <Button variant="ghost" tw="w-[121px] flex flex-col items-center hover:bg-gray-50" onClick={onClick}>
      <div tw="text-info text-gray-700">{title}</div>
      <div tw="text-b1 text-nego-1000 font-bold">{value}</div>
    </Button>
  );
}

interface MySummaryProps {
  profileImagePath?: string | StaticImageData;
  nickname?: string;
  point?: number;
  couponCount?: number;
  onClickMyDetail?: () => void;
  onClickNegoPoint?: () => void;
  onClickNegoMoney?: () => void;
  onClickCoupons?: () => void;
}

export default function MobMySummary({
  nickname,
  profileImagePath,
  onClickMyDetail,
  onClickCoupons,
  onClickNegoMoney,
  onClickNegoPoint,
}: MySummaryProps) {
  return (
    <div>
      <button
        type="button"
        tw="w-full py-6 px-5 flex items-center text-start border-b border-b-gray-300 hover:bg-gray-50"
        onClick={onClickMyDetail}
      >
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
        <SummaryItem title="포인트" value="0P" onClick={onClickNegoPoint} />
        <div tw="w-[2px] h-6 bg-gray-300 mx-1" />
        <SummaryItem title="머니" value="0P" onClick={onClickNegoMoney} />
        <div tw="w-[2px] h-6 bg-gray-300 mx-1" />
        <SummaryItem title="쿠폰" value="0장" onClick={onClickCoupons} />
      </div>
    </div>
  );
}