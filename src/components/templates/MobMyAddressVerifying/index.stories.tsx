import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MobMyAddressVerifying from '.';

export default {
  title: 'templates/MobMyAddressVerifying',
  component: MobMyAddressVerifying,
} as ComponentMeta<typeof MobMyAddressVerifying>;

export const Default: ComponentStory<typeof MobMyAddressVerifying> = () => (
  <Panel>
    <MobMyAddressVerifying />
  </Panel>
);

Default.args = {};
