import { Chip } from '@/components/atoms';

import { css } from 'twin.macro';

import { RealestateType } from '@/constants/enums';

import { MyFavoriteDanjiListUiItem } from '@/components/domains/my/favorite-list/types';

import LikeButton from './LikeButton';

const informationStringWrapper = css`
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

interface DanjiProps extends MyFavoriteDanjiListUiItem {
  onToggleDanjiLike?: (danjiID: number, realestateType: number, isDanjiFavorite: boolean) => void;
  onClickDanjiItem?: (danjiID: number, realestateType: number) => () => void;
}

export default function Danji({
  onToggleDanjiLike,
  onClickDanjiItem,
  danjiId,
  realestateType,
  eubmyundong,
  danjiName,
  roadNameAddress,
  totalSaedaeCount,
  year,
  month,
  day,
  jeonyongMax,
  jeonyongMin,
  buyCount,
  jeonsaeCount,
  wolsaeCount,
  isFavorite,
  dongCount,
}: DanjiProps) {
  const renderRealestateType = () => {
    switch (realestateType) {
      case RealestateType.Apartment:
        return '아파트';
      case RealestateType.Officetel:
        return '오피스텔';
      case RealestateType.Dasaedae:
        return '다세대';
      case RealestateType.Yunrip:
        return '연립';
      case RealestateType.Dandok:
        return '단독';
      case RealestateType.Dagagoo:
        return '다가구';
      default:
        return '아파트';
    }
  };

  const setChipVariant = () => {
    switch (realestateType) {
      case RealestateType.Apartment:
        return 'nego';
      case RealestateType.Officetel:
        return 'green';
      case RealestateType.Dasaedae:
        break;
      case RealestateType.Yunrip:
        break;
      case RealestateType.Dandok:
        break;
      case RealestateType.Dagagoo:
        break;
      default:
        break;
    }
  };

  return (
    <button
      type="button"
      tw="border-gray-300 block border w-full rounded-lg"
      onClick={onClickDanjiItem?.(danjiId, realestateType)}
    >
      <div tw="justify-between flex px-4 pt-[1.125rem] pb-4">
        <div tw="text-left">
          <div tw="mb-1.5 flex gap-1">
            <Chip variant={setChipVariant()}>{renderRealestateType()}</Chip>
            {eubmyundong && <Chip variant="gray">{eubmyundong}</Chip>}
          </div>
          <div tw="text-b1 font-bold text-gray-1000">{danjiName}</div>
          <div tw="text-info text-gray-1000">{roadNameAddress}</div>
          <div tw="flex" css={informationStringWrapper}>
            {totalSaedaeCount && (
              <div tw="shrink-0 text-info text-gray-700">{Number(totalSaedaeCount).toLocaleString()}세대</div>
            )}
            {dongCount > 0 && <div tw="shrink-0 text-info text-gray-700">총 {dongCount}동</div>}
            {year && <div tw="shrink-0 text-info text-gray-700">{`${year}.${month}.${day} 준공`}</div>}
            {jeonyongMin && (
              <div tw="shrink-0 text-info text-gray-700">{`전용 ${Number(jeonyongMin).toFixed(0)}-${Number(
                jeonyongMax,
              ).toFixed(0)}㎡`}</div>
            )}
          </div>
        </div>
        <div tw="shrink-0 self-start">
          <LikeButton onLike={() => onToggleDanjiLike?.(danjiId, realestateType, isFavorite)} isFavorite={isFavorite} />
        </div>
      </div>
      <div tw="border-t border-gray-300  px-4 py-1.5 flex" css={informationStringWrapper}>
        <div tw="text-gray-1000 text-info">
          매매 <span tw="text-blue-1000 font-medium">{buyCount}</span>
        </div>
        <div tw="text-gray-1000 text-info">
          전세 <span tw="text-blue-1000 font-medium">{jeonsaeCount}</span>
        </div>
        <div tw="text-gray-1000 text-info">
          월세 <span tw="text-blue-1000 font-medium">{wolsaeCount}</span>
        </div>
      </div>
    </button>
  );
}
