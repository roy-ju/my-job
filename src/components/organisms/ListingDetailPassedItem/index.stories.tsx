import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingDetailPassedItem from '.';

export default {
  title: 'organisms/ListingDetailPassedItem',
  component: ListingDetailPassedItem,
} as ComponentMeta<typeof ListingDetailPassedItem>;

export const Default: ComponentStory<typeof ListingDetailPassedItem> = (args) => <ListingDetailPassedItem {...args} />;

Default.args = {
  listingTitle: '펜트라우스 104동',
  address: '도로명주소',
  area: '44',
  floorDescription: '저',
  floor: '22',
  direction: '남향',
};
