import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import SuggestRecommendListItem from '.';

export default {
  title: 'organisms/SuggestRecommendListItem',
  component: SuggestRecommendListItem,
} as ComponentMeta<typeof SuggestRecommendListItem>;

export const Default: ComponentStory<typeof SuggestRecommendListItem> = (args) => (
  <Panel>
    <SuggestRecommendListItem {...args} />
  </Panel>
);

Default.args = {
  suggestItem: {
    user_nickname: '샘리카카오로그인',
    user_profile_image_url:
      'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
    created_time: '2023-09-12T14:45:06+09:00',
    realestate_types: '10',
    suggest_id: 117,
    suggest_status: 1,
    buy_or_rents: '2,3',
    trade_or_deposit_price: 100000000,
    monthly_rent_fee: 100000,
    pyoung_text: '20평, 24평, 34평, 35평, 46평',
    purpose: '',
    invest_amount: 0,
    quick_sale: null,
    negotiable: true,
    move_in_date: '2023-09-30T00:00:00+09:00',
    move_in_date_type: 3,
    note: '추가조건 없습니다.',
    request_target_text: '샘마을한양',
  },

  suggestRecommendItem: {
    suggest_recommend_id: 95,
    created_time: '2023-09-13T10:03:19+09:00',
    suggest_recommend_status: 1,
    with_address: false,
    address_free_text: 'test',
    trade_or_deposit_price: 10000000,
    monthly_rent_fee: 0,
    jeonyong_areas: '',
    floor: '',
    direction: '',
    buy_or_rent: 1,
    note: 'test',
    chat_room_id: null,
  },
};
