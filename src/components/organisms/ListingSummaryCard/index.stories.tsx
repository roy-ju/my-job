import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingSummaryCard from '.';

export default {
  title: 'organisms/ListingSummaryCard',
  component: ListingSummaryCard,
} as ComponentMeta<typeof ListingSummaryCard>;

export const Default: ComponentStory<typeof ListingSummaryCard> = (args) => <ListingSummaryCard {...args} />;

Default.args = {
  listingTitle: '펜트라우스 104동',
  address: '도로명주소',
  area: '44',
  floorDescription: '저',
  floor: '22',
  direction: '남향',
};
