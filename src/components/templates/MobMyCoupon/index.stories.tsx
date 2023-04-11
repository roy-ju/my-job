import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MobMyCoupon from '.';

export default {
  title: 'templates/MobMyCoupon',
  component: MobMyCoupon,
} as ComponentMeta<typeof MobMyCoupon>;

export const Default: ComponentStory<typeof MobMyCoupon> = ({ hasData }) => (
  <Panel>
    <MobMyCoupon hasData={hasData} />
  </Panel>
);

Default.args = {
  hasData: true,
};
