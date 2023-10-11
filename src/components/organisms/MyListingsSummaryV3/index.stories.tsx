import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyListingSummaryV3 from '.';

export default {
  title: 'organisms/MyListingSummaryV3',
  component: MyListingSummaryV3,
} as ComponentMeta<typeof MyListingSummaryV3>;

export const Default: ComponentStory<typeof MyListingSummaryV3> = (args) => <MyListingSummaryV3 {...args} />;

Default.args = {};
