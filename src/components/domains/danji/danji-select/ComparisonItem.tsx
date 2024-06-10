import tw from 'twin.macro';

import { formatNumberInKorean } from '@/utils';

import { minDigits } from '@/utils/fotmat';

const Wrraper = tw.div``;

const StyledTableBodyTypography = tw.span`font-normal [font-size: 0.875rem] [line-height: 1.25rem] text-nego-1000 [text-align: right]`;

const StyledTableBodyListingTypography = tw.span`font-normal [font-size: 0.875rem] [line-height: 1.25rem] text-gray-1000 [text-align: right]`;

type ListItem = {
  name: string;
  danji_id: number;
  realestate_type: number;
  saedae_count: number;
  year: number;
  month: number;
  day: number;
  price: number;
  distance: number;
};

type ListItemDanji = { name: string; danjiID: number; rt: number };

export default function ComparisonItem({
  item,
  selectedBtn,
  onClickDanjiItem,
}: {
  item: ListItem;
  selectedBtn: string;
  onClickDanjiItem: (item: ListItemDanji) => void;
}) {
  const calculateDistance = (val: number | null | undefined) => {
    if (!val) return '-';

    if (val < 1) {
      return `${Math.round(val * 1000)}m`;
    }

    const kmVal = val.toFixed(1);

    return kmVal[kmVal.length - 1] === '0' ? `${kmVal.slice(0, kmVal.length - 2)}km` : `${kmVal}km`;
  };

  return (
    <Wrraper
      onClick={() => {
        const convertedItem = { ...item, rt: item.realestate_type, danjiID: item.danji_id };
        onClickDanjiItem(convertedItem);
      }}
      tw="flex flex-row items-center [border-bottom: 1px solid #F8F9FA] py-4 gap-1 cursor-pointer"
    >
      <div tw="flex items-center w-full">
        <StyledTableBodyListingTypography tw="[text-align: left] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap [min-width: 143px] [max-width: 143px]">
          {item.name}
        </StyledTableBodyListingTypography>
        <StyledTableBodyTypography tw="[margin-left: auto]">
          {selectedBtn === '최근 거래일순' &&
            (item.year && item.month && item.day
              ? `${item.year.toString().slice(2, 4)}.${minDigits(+item.month, 2)}.${minDigits(+item.day, 2)}`
              : '-')}
          {selectedBtn === '평당 거래가순' &&
            (item.price ? `${formatNumberInKorean(Math.round(item.price / 10000) * 10000)}` : '-')}
          {selectedBtn === '세대 많은 순' && (item.saedae_count ? `${item.saedae_count.toLocaleString()} 세대` : '-')}
          {selectedBtn === '거리순' && calculateDistance(item.distance)}
        </StyledTableBodyTypography>
      </div>
    </Wrraper>
  );
}
