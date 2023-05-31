import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyListingSummary from '.';

export default {
  title: 'organisms/MyListingSummary',
  component: MyListingSummary,
} as ComponentMeta<typeof MyListingSummary>;

export const Default: ComponentStory<typeof MyListingSummary> = (args) => <MyListingSummary {...args} />;

Default.args = {};
