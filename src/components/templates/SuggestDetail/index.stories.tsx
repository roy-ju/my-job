import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import SuggestDetail from '.';

export default {
  title: 'templates/SuggestDetail',
  component: SuggestDetail,
} as ComponentMeta<typeof SuggestDetail>;

const mock = {
  suggest_danji_summary: {
    name: '반포써밋',
    road_name_address: '서울특별시 서초구 고무래로 89',
    saedae_count: '764',
    use_accepted_year: '2018.09.21',
    jeonyong_min: '49.8',
    jeonyong_max: '133.1',
  },
  suggest_id: 11,
  request_number: 'S1234567891011',
  danji_or_regional: 1,
  request_target_text: '반포써밋',
  realestate_types: '10',
  buy_or_rents: '2,3',
  trade_or_deposit_price: 10000000,
  monthly_rent_fee: 0,
  pyoung_text: '30평,31평,32평,33평',
  purpose: '투자',
  remaining_amount_payment_time: '2023-05-01T09:00:00+09:00',
  remaining_amount_payment_time_type: 2,
  move_in_date: '2023-05-01T09:00:00+09:00',
  move_in_date_type: 1,
  floors: '저층,중층,고층',
  note: '고층의 매물을 원하기는 하지만 그래도 없으면 그냥 추천은 받을게요',
  updated_time: '2023-04-21T12:13:52+09:00',
  created_time: '2023-04-21T12:13:52+09:00',
};

export const Default: ComponentStory<typeof SuggestDetail> = () => (
  <Panel>
    <SuggestDetail suggestData={mock} />
  </Panel>
);

Default.args = {};
