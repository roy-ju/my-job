import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SuggestDetailListItem from '.';

export default {
  title: 'organisms/SuggestDetailListItem',
  component: SuggestDetailListItem,
} as ComponentMeta<typeof SuggestDetailListItem>;

export const Default: ComponentStory<typeof SuggestDetailListItem> = () => <SuggestDetailListItem />;

Default.args = {};
