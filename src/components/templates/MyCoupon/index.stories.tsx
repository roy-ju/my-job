import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyCoupon from '.';

export default {
  title: 'templates/MyCoupon',
  component: MyCoupon,
} as ComponentMeta<typeof MyCoupon>;

export const NoData: ComponentStory<typeof MyCoupon> = () => (
  <Panel>
    <MyCoupon />
  </Panel>
);
