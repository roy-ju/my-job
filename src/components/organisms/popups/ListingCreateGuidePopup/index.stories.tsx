import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingCreateGuidePopup from '.';

export default {
  title: 'organisms/popups/ListingCreateGuidePopup',
  component: ListingCreateGuidePopup,
} as ComponentMeta<typeof ListingCreateGuidePopup>;

export const Default: ComponentStory<typeof ListingCreateGuidePopup> = () => <ListingCreateGuidePopup />;

Default.args = {};
