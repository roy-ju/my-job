import { useMemo } from 'react';

import tw, { styled } from 'twin.macro';

import { MySuggestListItem } from '@/services/my/types';

import { BuyOrRent } from '@/constants/enums';

import RealestateTypeLabel from './RealestateTypeLabel';

import CreatedTime from './CreatedTime';

import Price from './Price';

import Pyoung from './Pyoung';

import CompleteStatusLabel from './CompleteStatusLabel';

import SuggestCounts from './SuggestCounts';

const ListItemHeader = styled.div`
  ${tw`flex items-center justify-between`}
`;

const BasicInfo = styled.div`
  ${tw`flex flex-col gap-0.5 py-2`}
`;

const BuyOrRentPriceNegotiableWrraper = styled.div`
  ${tw`text-gray-700 text-body_02`}
`;

const Title = styled.p`
  ${tw`overflow-hidden text-heading_01 text-ellipsis whitespace-nowrap`}
`;

type ListItemProps = {
  item: MySuggestListItem;
  handleClick: (id: number) => void;
};

export default function ListItem({ item, handleClick }: ListItemProps) {
  const buyOrRentText = useMemo(
    () => (Number(item?.buy_or_rents) === BuyOrRent.Buy ? '매매 ' : '전월세 '),
    [item?.buy_or_rents],
  );

  return (
    <div>
      <button type="button" tw="w-full text-start px-5" onClick={() => handleClick(item.suggest_id)}>
        <div tw="py-2">
          <ListItemHeader tw="flex justify-between items-center">
            <RealestateTypeLabel realestateTypes={item.realestate_types} />
            <CreatedTime time={item.created_time} />
          </ListItemHeader>
          <BasicInfo>
            <Title>{item.title}</Title>
            <BuyOrRentPriceNegotiableWrraper>
              <span>{buyOrRentText}</span>
              <Price
                tradeOrDepositPrice={item?.trade_or_deposit_price ?? 0}
                monthlyRentFee={item?.monthly_rent_fee ?? 0}
                quickSale={item?.quick_sale ?? false}
              />
              {item.negotiable && <span>&nbsp;(협의 가능)</span>}
            </BuyOrRentPriceNegotiableWrraper>
            <Pyoung pyoung={item.pyoung_text} />
          </BasicInfo>
          <CompleteStatusLabel />
          <SuggestCounts newCount={0} allCount={item.suggest_recommended_count} />
        </div>
      </button>
    </div>
  );
}
