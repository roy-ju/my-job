import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingMarker from '.';

export default {
  title: 'molecules/map_markers/ListingMarker',
  component: ListingMarker,
} as ComponentMeta<typeof ListingMarker>;

export const Listing: ComponentStory<typeof ListingMarker> = (args) => (
  <ListingMarker {...args} />
);

Listing.storyName = '매물';
Listing.args = {
  price: 100000000,
  count: 0,
};

export const ListingWithCount: ComponentStory<typeof ListingMarker> = (
  args,
) => <ListingMarker {...args} />;

ListingWithCount.storyName = '매물/n개';
ListingWithCount.args = {
  price: 100000000,
  count: 9,
};
