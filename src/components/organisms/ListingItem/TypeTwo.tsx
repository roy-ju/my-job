import tw from 'twin.macro';

import { Avatar, Chip, Numeral } from '@/components/atoms';

import { DanjiSuggestListItem } from '@/apis/danji/danjiSuggestList';

import { convertRangeText } from '@/utils/fotmat';

import { formatCreatedTime } from '@/utils/formatsTime';

import ArrowRight from '@/assets/icons/arrow_right_16.svg';

import ViewIcon from '@/assets/icons/view.svg';

function PriceText({
  tradeOrDepositPrice,
  monthlyRentFee,
  quickSale,
}: {
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  quickSale: boolean;
}) {
  if (quickSale) return <span>급매 구해요</span>;

  if (!tradeOrDepositPrice && !monthlyRentFee) return <span>급매 구해요</span>;

  if (monthlyRentFee) {
    return (
      <>
        <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
      </>
    );
  }
  return <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>;
}

export default function TypeTwo({
  item,
  anchorURL,
  onClick,
}: {
  item?: DanjiSuggestListItem;
  anchorURL?: string;
  onClick?: (id: number) => void;
}) {
  if (!item) return null;

  const ChipText = {
    MySuggest: '내가 쓴글',
    IamRecommending: '우리집 추천중',
    Completed: '거래성사',
  };

  return (
    <button
      type="button"
      tw="flex flex-col p-4 border border-gray-300 rounded-lg hover:bg-gray-200"
      css={[tw`w-full`]}
      onClick={() => onClick?.(item.suggest_id)}
    >
      <div tw="w-full flex items-center gap-1">
        <Avatar src={item.user_profile_image_url} alt="프로필" size={24} />
        <span tw="text-info text-gray-700 [letter-spacing: -0.4px] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap max-w-[150px]">
          {item.user_nickname}
        </span>

        {item.my_suggest && <Chip variant="nego">{ChipText.MySuggest}</Chip>}
        {item.iam_recommending && (
          <Chip variant="yellow" tw="text-red-1100">
            {ChipText.IamRecommending}
          </Chip>
        )}

        {item.my_suggest || item.iam_recommending ? (
          <p tw="flex items-center text-info leading-4 whitespace-nowrap ml-auto">
            상세보기
            <ArrowRight />
          </p>
        ) : (
          <p tw="flex items-center text-info leading-4 whitespace-nowrap ml-auto">
            상세보기
            <ArrowRight />
          </p>
        )}
      </div>

      <div tw="font-bold pt-2 pb-1">
        {anchorURL ? (
          <a
            href={anchorURL}
            onClick={(e) => {
              e.preventDefault();
              onClick?.(item.suggest_id);
            }}
          >
            <h1 tw="text-b1 [display: inline]">{item.buy_or_rents === '1' ? '매매' : '전월세'} </h1>
            <PriceText
              tradeOrDepositPrice={item.trade_or_deposit_price}
              monthlyRentFee={item.monthly_rent_fee}
              quickSale={item.quick_sale}
            />
          </a>
        ) : (
          <>
            <h1 tw="text-b1 [display: inline]">{item.buy_or_rents === '1' ? '매매' : '전월세'} </h1>
            <PriceText
              tradeOrDepositPrice={item.trade_or_deposit_price}
              monthlyRentFee={item.monthly_rent_fee}
              quickSale={item.quick_sale}
            />
          </>
        )}
      </div>

      <div tw="flex w-full">
        <div tw="flex items-center gap-1  text-gray-700 text-b2">
          <div tw="shrink-0">
            {convertRangeText({
              unit: '평',
              dashStyle: '~',
              bracket: true,
              v1: item.pyoung_from,
              v2: item.pyoung_to,
            })}
          </div>

          {item.note && item.additional_conditions && (
            <div tw="break-all line-clamp-1">
              {`${item.note}, ${item.additional_conditions.split(',').join(', ')}` || ''}
            </div>
          )}
          {item.note && !item.additional_conditions && <div tw="break-all line-clamp-1">{`${item.note}`}</div>}

          {!item.note && item.additional_conditions && (
            <div tw="break-all line-clamp-1">
              {`${item.additional_conditions.split(',').join(', ')}, ${item.note}` || ''}
            </div>
          )}
        </div>
      </div>

      <div tw="mt-1 flex items-center w-full">
        <p tw="text-gray-700 [letter-spacing: -0.4px] text-info">{formatCreatedTime(item.created_time)}</p>
        <div tw="flex gap-1 ml-auto items-center">
          <ViewIcon />
          <span tw="text-gray-700 [letter-spacing: -0.25px] text-info">{item.view_count}</span>
        </div>
      </div>
    </button>
  );
}
