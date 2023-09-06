import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ChatRoomDetailsAccordion from '.';

export default {
  title: 'organisms/ChatRoomDetailsAccordion',
  component: ChatRoomDetailsAccordion,
} as ComponentMeta<typeof ChatRoomDetailsAccordion>;

export const Default: ComponentStory<typeof ChatRoomDetailsAccordion> = (args) => (
  <ChatRoomDetailsAccordion {...args}>
    <div tw="flex flex-col gap-4">
      <p>매수인채팅 - 중개사 가격제안</p>
      <ChatRoomDetailsAccordion.BuyerAgentBidding />
      <p>매수인채팅 - 중개사, 집주인 매물추천</p>
      <ChatRoomDetailsAccordion.BuyerAgentSuggestRecommendation />
      <ChatRoomDetailsAccordion.BuyerSellerSuggestRecommendation />
      <p>매도인채팅 - 중개사 매물등록</p>
      <ChatRoomDetailsAccordion.SellerAgentListingRegister />
      <p>매도인채팅 - 매수인 매물추천</p>
      <ChatRoomDetailsAccordion.SellerBuyerSuggestRecommendation />
    </div>
  </ChatRoomDetailsAccordion>
);

Default.args = {
  suggestItem: {
    suggest_id: 38,
    suggest_status: 1,
    buy_or_rents: '1',
    trade_or_deposit_price: 20000000,
    monthly_rent_fee: 0,
    pyoung_text: '10~20평',
    purpose: '실거주',
    invest_amount: 0,
    quick_sale: null,
    negotiable: false,
    move_in_date: '2023-08-31T00:00:00+09:00',
    move_in_date_type: 1,
    note: '원해요',
  },
  suggestRecommendItem: {
    suggest_recommend_id: 29,
    suggest_recommend_status: 2,
    with_address: true,
    address_free_text: '분당구 오피스텔 강추요',
    trade_or_deposit_price: 1000000,
    monthly_rent_fee: 0,
    jeonyong_areas: '20',
    floor: '15층',
    direction: '동향',
    buy_or_rent: 1,
    note: '아주 강추 합니다.',
  },
  listingItem: {
    listing_id: 3688,
    listing_status: 20,
    buy_or_rent: 2,
    trade_or_deposit_price: 20000000,
    monthly_rent_fee: 0,
    listing_title: '삼평동 오피스텔',
    jeonyong_area: '84',
    floor_description: '저층',
    total_floor: '20',
    direction: '남',
  },
  biddingItem: {
    bidding_id: 1554,
    bidding_status: 2,
    bidding_trade_or_deposit_price: 20000000,
    bidding_monthly_rent_fee: 0,
  },
};
