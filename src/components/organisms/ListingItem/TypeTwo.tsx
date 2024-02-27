import tw, { styled } from 'twin.macro';

import { Numeral } from '@/components/atoms';

import { DanjiSuggestListItem } from '@/apis/danji/danjiSuggestList';

import ChipV2 from '@/components/atoms/ChipV2';

import CreatedTime from '@/components/domains/my/suggest-requested-list/CreatedTime';

import StatusLabel from './StatusLabel';

const CardButton = styled.button`
  ${tw`w-full flex flex-col p-5 pb-4 border border-gray-200 rounded-lg hover:border-gray-300 [box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06)]`}
`;

const BuyOrRentText = styled.h1`
  ${tw`inline`}
`;

const NegotiableText = styled.span`
  ${tw`text-gray-600 text-body_02`}
`;

const MainWrraper = styled.div`
  ${tw`text-heading_01 text-gray-800 pb-0.5`}
`;

const Flex = styled.div`
  ${tw`flex flex-row items-center`}
`;

const ATagFlex = styled.a`
  ${tw`flex flex-row items-center`}
`;

function PriceText({
  tradeOrDepositPrice,
  monthlyRentFee,
  quickSale,
}: {
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  quickSale: boolean;
}) {
  if (quickSale) return <span>급매</span>;

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
    <CardButton onClick={() => onClick?.(item.suggest_id)}>
      {item.my_suggest && (
        <ChipV2 variant="primary" size="small" tw="mb-3">
          {ChipText.MySuggest}
        </ChipV2>
      )}

      {item.iam_recommending && (
        <ChipV2 variant="green" size="small" tw="mb-3">
          {ChipText.IamRecommending}
        </ChipV2>
      )}

      <MainWrraper>
        {anchorURL ? (
          <ATagFlex
            href={anchorURL}
            onClick={(e) => {
              e.preventDefault();
              onClick?.(item.suggest_id);
            }}
            tw="flex flex-row items-center"
          >
            <BuyOrRentText>{item.buy_or_rents === '1' ? '매매' : '전월세'} </BuyOrRentText>
            <PriceText
              tradeOrDepositPrice={item.trade_or_deposit_price}
              monthlyRentFee={item.monthly_rent_fee}
              quickSale={item.quick_sale}
            />
            {item?.negotiable && <NegotiableText>&nbsp;(협의가능)</NegotiableText>}
          </ATagFlex>
        ) : (
          <Flex>
            <BuyOrRentText>{item.buy_or_rents === '1' ? '매매' : '전월세'} </BuyOrRentText>
            <PriceText
              tradeOrDepositPrice={item.trade_or_deposit_price}
              monthlyRentFee={item.monthly_rent_fee}
              quickSale={item.quick_sale}
            />
            {item?.negotiable && <NegotiableText>&nbsp;(협의가능)</NegotiableText>}
          </Flex>
        )}
      </MainWrraper>

      <div tw="w-full flex items-center">
        <p tw="text-gray-700 text-body_02 whitespace-nowrap text-ellipsis overflow-hidden">{item.pyoung_text}</p>
      </div>

      <div tw="mt-2 w-full text-left">
        <CreatedTime time={item.created_time} />
      </div>

      <StatusLabel render={false} iconType="success" message="거래성사가 완료되었습니다." />
    </CardButton>
  );
}
