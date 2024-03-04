import tw, { styled } from 'twin.macro';

import { Numeral } from '@/components/atoms';

import CreatedTime from '@/components/domains/my/suggest-requested-list/CreatedTime';

import { DanjiSuggestListItem } from '@/services/danji/types';

import MySuggestLabel from './MySuggestLabel';

import IamRecommendingLabel from './IamRecommendingLabel';

import StatusLabelInCard from './StatusLabelInCard';

const CardButton = styled.button`
  ${tw`[width: calc(100% - 40px)] flex flex-col p-5 pb-4 border border-gray-200 [border-radius: 12px] hover:border-gray-300 [box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06)] mx-5`}
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

const StatusLabelWrraper = styled.div`
  ${tw`w-full mt-3`}
`;

const LabelWrraper = styled.div`
  ${tw`flex items-center justify-center mb-3`}
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
  if (quickSale) return <span>&nbsp;급매물 구해요</span>;

  if (!tradeOrDepositPrice && !monthlyRentFee) return <span>&nbsp;급매물 구해요</span>;

  if (monthlyRentFee) {
    return (
      <>
        &nbsp;<Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>&nbsp;/&nbsp;
        <Numeral koreanNumber>{monthlyRentFee}</Numeral>
      </>
    );
  }

  return (
    <>
      &nbsp;<Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>
    </>
  );
}

export default function SuggestCardInDanji({
  item,
  onClick,
}: {
  item?: DanjiSuggestListItem;
  onClick?: (id: number) => void;
}) {
  if (!item) return null;

  return (
    <CardButton onClick={() => onClick?.(item.suggest_id)}>
      {item.my_suggest && (
        <LabelWrraper>
          <MySuggestLabel />
        </LabelWrraper>
      )}

      {item.iam_recommending && (
        <LabelWrraper>
          <IamRecommendingLabel />
        </LabelWrraper>
      )}

      <MainWrraper>
        <Flex>
          <BuyOrRentText>{item.buy_or_rents === '1' ? '매매' : '전월세'} </BuyOrRentText>
          <PriceText
            tradeOrDepositPrice={item.trade_or_deposit_price}
            monthlyRentFee={item.monthly_rent_fee}
            quickSale={item.quick_sale}
          />
          {item?.negotiable && <NegotiableText>&nbsp;(협의가능)</NegotiableText>}
        </Flex>
      </MainWrraper>

      <div tw="w-full flex items-center">
        <p tw="text-gray-700 text-body_02 whitespace-nowrap text-ellipsis overflow-hidden">{item.pyoung_text}</p>
      </div>

      <div tw="mt-2 w-full text-left">
        <CreatedTime time={item.created_time} />
      </div>

      {item.suggest_complete_status && (
        <StatusLabelWrraper>
          <StatusLabelInCard render iconType="success" message="거래성사가 완료되었습니다." />
        </StatusLabelWrraper>
      )}
    </CardButton>
  );
}
