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
  ${tw`flex flex-col gap-0.5`}
`;

const BuyOrRentPriceNegotiableWrraper = styled.div`
  ${tw`text-gray-700 text-body_02`}
`;

const Title = styled.p`
  ${tw`overflow-hidden text-gray-800 text-heading_01 text-ellipsis whitespace-nowrap`}
`;

const StatusLabelWrraper = styled.div`
  ${tw`mt-2`}
`;

type ListItemProps = {
  item: MySuggestListItem;
  handleClick: (id: number) => void;
};

export default function ListItem({ item, handleClick }: ListItemProps) {
  console.log(item);
  const labelRenderType = useMemo(() => {
    if (item?.suggest_complete_status) return 'success';

    if (item?.suggest_recommended_count && item.suggest_recommended_count > 0) return '';

    if (!item?.is_interviewed) return 'interview';

    return '';
  }, [item]);

  const newCount =
    labelRenderType === 'success' || labelRenderType === 'interview' ? 0 : item.new_suggest_recommended_count;

  const allCount =
    labelRenderType === 'success' || labelRenderType === 'interview' ? 0 : item.suggest_recommended_count;

  return (
    <div>
      <button type="button" tw="w-full text-start" onClick={() => handleClick(item.suggest_id)}>
        <div tw="flex flex-col gap-2 py-2">
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

          {labelRenderType === 'interview' && (
            <StatusLabelWrraper>
              <StatusLabel render iconType="interview" message="인터뷰 진행 전이에요!" />
            </StatusLabelWrraper>
          )}

          <SuggestCounts newCount={newCount} allCount={allCount} />
        </div>
      </button>
    </div>
  );
}
