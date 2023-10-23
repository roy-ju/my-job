import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SuggestRequestedListItem from '.';

export default {
  title: 'organisms/SuggestRequestedListItem',
  component: SuggestRequestedListItem,
} as ComponentMeta<typeof SuggestRequestedListItem>;

export const Default: ComponentStory<typeof SuggestRequestedListItem> = (args) => (
  <SuggestRequestedListItem {...args} />
);

Default.args = {
  item: {
    suggest_id: 36,
    status: 1,
    realestate_types: '20',
    title: '에이스네스트빌',
    danji_or_regional: 1,
    buy_or_rents: '2,3',
    trade_or_deposit_price: 10000,
    monthly_rent_fee: 10000,
    pyoung_text: '1평',
    negotiable: true,
    quick_sale: true,
    suggest_recommended_count: 0,
    created_time: '2023-09-14T15:26:29+09:00',
    has_new: true,
  },
};
