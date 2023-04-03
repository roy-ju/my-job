import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyAddressVerifying from '.';

export default {
  title: 'templates/MyAddressVerifying',
  component: MyAddressVerifying,
} as ComponentMeta<typeof MyAddressVerifying>;

export const Default: ComponentStory<typeof MyAddressVerifying> = () => (
  <Panel>
    <MyAddressVerifying />
  </Panel>
);

Default.args = {};
