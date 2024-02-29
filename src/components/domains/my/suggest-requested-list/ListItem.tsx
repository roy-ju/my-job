import { useMemo } from 'react';

import tw, { styled } from 'twin.macro';

import { MySuggestListItem } from '@/services/my/types';

import StatusLabel from '@/components/organisms/suggest/StatusLabel';

import RealestateTypeLabel from './RealestateTypeLabel';

import CreatedTime from './CreatedTime';

import Price from './Price';

import Pyoung from './Pyoung';

import SuggestCounts from './SuggestCounts';

import BuyOrRent from './BuyOrRent';

import Negotiable from './Negotiable';

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
  ${tw`overflow-hidden text-gray-800 text-heading_01 text-ellipsis whitespace-nowrap`}
`;

const StatusLabelWrraper = styled.div`
  ${tw`my-2`}
`;

type ListItemProps = {
  item: MySuggestListItem;
  handleClick: (id: number) => void;
};

export default function ListItem({ item, handleClick }: ListItemProps) {
  const labelRenderType = useMemo(() => {
    if (item?.suggest_complete_status) return 'success';

    return '';
  }, [item]);

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
              <BuyOrRent buyOrRents={item.buy_or_rents} />
              <Price
                tradeOrDepositPrice={item?.trade_or_deposit_price ?? 0}
                monthlyRentFee={item?.monthly_rent_fee ?? 0}
                quickSale={item?.quick_sale ?? false}
              />
              <Negotiable negotiable={item.negotiable} />
            </BuyOrRentPriceNegotiableWrraper>
            <Pyoung pyoung={item.pyoung_text} />
          </BasicInfo>

          {labelRenderType === 'success' && (
            <StatusLabelWrraper>
              <StatusLabel render iconType="success" message="거래 성사가 완료되었습니다." />
            </StatusLabelWrraper>
          )}

          <SuggestCounts
            newCount={labelRenderType === 'success' ? 0 : item.new_suggest_recommended_count}
            allCount={labelRenderType === 'success' ? 0 : item.suggest_recommended_count}
          />
        </div>
      </button>
    </div>
  );
}
