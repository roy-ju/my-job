import { Chip } from '@/components/atoms';
import { css } from 'twin.macro';
import LikeButton from './LikeButton';

const informationStringWrapper = css`
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

export interface DanjiProps {}

export default function Danji() {
  return (
    <div tw="border-gray-300 border rounded-lg">
      <div tw="justify-between flex px-4 pt-[1.125rem] pb-4">
        <div tw="text-left">
          <div tw="mb-1.5 flex gap-1">
            <Chip>아파트</Chip>
            <Chip variant="gray">개포동</Chip>
          </div>
          <div tw="text-b1 font-bold text-gray-1000">올림픽파크</div>
          <div tw="text-info text-gray-1000">도로명주소</div>
          <div tw="flex" css={informationStringWrapper}>
            <div tw="text-info text-gray-700">12,032세대</div>
            <div tw="text-info text-gray-700">총 85동</div>
            <div tw="text-info text-gray-700">2025.01.13 준공</div>
            <div tw="text-info text-gray-700">전용 144-155㎡</div>
          </div>
        </div>
        <div tw="shrink-0 self-start">
          <LikeButton onLike={() => {}} isLiked={false} />
        </div>
      </div>
      <div tw="border-t border-gray-300  px-4 py-1.5 flex" css={informationStringWrapper}>
        <div tw="text-gray-1000 text-info">
          매매 <span tw="text-blue-1000 font-medium">0</span>
        </div>
        <div tw="text-gray-1000 text-info">
          전세 <span tw="text-blue-1000 font-medium">644</span>
        </div>
        <div tw="text-gray-1000 text-info">
          월세 <span tw="text-blue-1000 font-medium">442</span>
        </div>
      </div>
    </div>
  );
}
