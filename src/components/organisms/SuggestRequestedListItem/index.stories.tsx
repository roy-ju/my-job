import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SuggestRequestedListItem from '.';

export default {
  title: 'SuggestRequestedListItem',
  component: SuggestRequestedListItem,
} as ComponentMeta<typeof SuggestRequestedListItem>;

export const Default: ComponentStory<typeof SuggestRequestedListItem> = () => <SuggestRequestedListItem />;

Default.args = {};
