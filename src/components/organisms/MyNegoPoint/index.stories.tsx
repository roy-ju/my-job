import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyNegoPoint from '.';

export default {
  title: 'organisms/MyNegoPoint',
  component: MyNegoPoint,
} as ComponentMeta<typeof MyNegoPoint>;

export const Default: ComponentStory<typeof MyNegoPoint> = (args) => <MyNegoPoint {...args} />;

Default.args = {
  totalPoint: 0,
  earnedPoint: 0,
  usedPoint: 0,
};
