import tw, { styled } from 'twin.macro';

import { SuggestDetailResponse } from '@/services/suggests/types';

import IamRecommendingLabel from '@/components/organisms/suggest/IamRecommendingLabel';

import UserInfo from './UserInfo';

import Price from './Price';

import CreatedTime from './CreatedTime';

type SummaryProps = { data: SuggestDetailResponse & ErrorResponse; iamRecommending: boolean };

const SummaryContainer = styled.div`
  ${tw`px-5 py-2`}
`;

const LabelWrraper = styled.div`
  ${tw`my-3`}
`;

export default function Summary({ data, iamRecommending }: SummaryProps) {
  return (
    <SummaryContainer>
      <UserInfo nickname={data.user_nickname} imgSrc={data.user_profile_image_url} />

      {iamRecommending && (
        <LabelWrraper>
          <IamRecommendingLabel />
        </LabelWrraper>
      )}

      <Price
        tradeOrDepositPrice={data.trade_or_deposit_price}
        monthlyRentFee={data.monthly_rent_fee}
        quickSale={data.quick_sale}
        negotiable={data.negotiable}
      />
      <CreatedTime time={data.created_time} />
    </SummaryContainer>
  );
}
