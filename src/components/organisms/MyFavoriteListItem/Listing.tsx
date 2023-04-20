import Image from 'next/image';
import Paths from '@/constants/paths';
import { Chip } from '@/components/atoms';
import { css } from 'twin.macro';
import LikeButton from './LikeButton';
import QuickSaleChip from './QuickSaleChip';
import ListingPopularityInformation from './ListingPopularityInformation';
import ListingStatusChip from './ListingStatusChip';

export interface ListingProps {}

const informationStringWrapper = css`
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

export default function Listing() {
  return (
    <div tw="flex gap-3 items-center">
      <div tw="relative">
        <ListingStatusChip status="제안중" />
        <Image src={Paths.DEFAULT_APARTMENT_IMAGE_PATH} alt="매물 사진" width={92} height={92} tw="rounded-lg" />
      </div>
      <div tw="flex-1">
        <div tw="mb-1.5 flex justify-between">
          <div tw="flex gap-1">
            <Chip variant="nego">오피스텔</Chip>
            <Chip variant="gray">개포동</Chip>
          </div>
          <LikeButton onLike={() => {}} isLiked={false} />
        </div>
        <div tw="font-bold text-b1 flex gap-1.5 items-center">
          <QuickSaleChip /> 매매 99억 9,9999만
        </div>
        <div tw="text-info">매봉삼성아파트</div>
        <div tw="flex justify-between items-center">
          <div tw="flex text-info text-gray-700" css={informationStringWrapper}>
            <div>전용 44㎡</div>
            <div>저/20층</div>
            <div>남향</div>
          </div>
          <ListingPopularityInformation viewCount={0} offerCount={0} />
        </div>
      </div>
    </div>
  );
}
