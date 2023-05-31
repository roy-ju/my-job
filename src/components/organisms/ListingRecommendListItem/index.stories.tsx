import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingRecommendListItem from '.';

export default {
  title: 'organisms/ListingRecommendListItem',
  component: ListingRecommendListItem,
} as ComponentMeta<typeof ListingRecommendListItem>;

export const Default: ComponentStory<typeof ListingRecommendListItem> = () => <ListingRecommendListItem />;

Default.args = {};
