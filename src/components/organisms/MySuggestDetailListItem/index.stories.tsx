import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MySuggestDetailListItem from '.';

export default {
  title: 'organisms/SuggestDetailListItem',
  component: MySuggestDetailListItem,
} as ComponentMeta<typeof MySuggestDetailListItem>;

export const Default: ComponentStory<typeof MySuggestDetailListItem> = () => <MySuggestDetailListItem />;

Default.args = {};
