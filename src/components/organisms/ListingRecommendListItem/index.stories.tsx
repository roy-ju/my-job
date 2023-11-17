import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingRecommendListItem from '.';

export default {
  title: 'organisms/ListingRecommendListItem',
  component: ListingRecommendListItem,
} as ComponentMeta<typeof ListingRecommendListItem>;

export const Default: ComponentStory<typeof ListingRecommendListItem> = () => <ListingRecommendListItem />;

/*
Default.args = {
  item: {
    agent_profile_image_url: '',
    agent_name: '제이제이',
    created_time: '2023-05-12T14:05:02+09:00',
    suggest_recommend_status: 1,
    realestate_type: 10,
    eubmyundong: '도곡동',
    listing_id: 3292,
    suggest_recommend_id: 96,
    thumbnail_full_path: '',
    quick_sale: true,
    listing_title: '투기지역 미입력',
    jeonyong_area: '23',
    floor_description: '저층',
    total_floor: '31',
    direction: '남',
    buy_or_rent: 1,
    note: '추천의견 없음',
    trade_or_deposit_price: 111000,
    monthly_rent_fee: 0,
    buyer_agent_chat_room_id: null,
    suggest_recommend_accepted_time: '',
  },
};
*/
