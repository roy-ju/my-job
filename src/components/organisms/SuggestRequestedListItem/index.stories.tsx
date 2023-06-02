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
    suggest_id: 182,
    title: '나인원한남',
    suggest_recommended_count: 10,
    created_time: '2023-05-23T14:15:08+09:00',
    status: 2,
    realestate_types: '10',
  },
  checked: true,
};
